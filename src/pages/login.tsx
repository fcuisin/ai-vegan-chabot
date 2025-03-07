import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { loginUser } from "@/services/user";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

type UserInfo = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { user, setUser } = useUser();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInfo.email || !userInfo.password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);

    try {
      const user = await loginUser(userInfo.email, userInfo.password);
      toast.success("Connexion réussie");
      setUser(user);
    } catch (error: unknown) {
      toast.error("Erreur lors de la connexion", {
        description: error instanceof Error ? error.message : "Erreur inconnue",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
        Connectez-vous à votre compte
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email-login">Email</Label>
            <Input
              id="email-login"
              type="email"
              placeholder="exemple@email.com"
              value={userInfo?.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-login">Mot de passe</Label>
            <Input
              id="password-login"
              type="password"
              value={userInfo?.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              required
              minLength={6}
            />
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md cursor-pointer bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
