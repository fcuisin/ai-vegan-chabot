import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

type User = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);

    try {
      //await loginUser(email, password);
      toast.success("Connexion réussie");
      //onAuthSuccess();
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
            <Label htmlFor="email-register">Email</Label>
            <Input
              id="email-register"
              type="email"
              placeholder="exemple@email.com"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-register">Mot de passe</Label>
            <Input
              id="password-register"
              type="password"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              minLength={6}
            />
            <p className="text-xs text-muted-foreground">
              Le mot de passe doit comporter au moins 6 caractères
            </p>
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
