import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            VegaBot
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Discutez, apprenez, répondez !
          </p>
          <p className="max-w-[42rem] text-muted-foreground md:text-lg mb-4">
            Une plateforme pour générer des réponses claires et factuelles aux
            critiques et idées reçues courantes sur le véganisme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to="/chatbot"
              className="inline-flex items-center justify-center rounded-full text-sm md:text-base font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
            >
              Commencer à discuter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full text-sm md:text-base font-medium border border-input bg-background shadow-sm hover:bg-secondary h-11 px-8"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexPage;
