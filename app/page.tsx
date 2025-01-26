import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Truck, Home as HomeIcon, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const ServiceCard = ({ icon, title, description, href }: ServiceCardProps) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-4">{description}</p>
    <Button variant="outline" className="w-full group" asChild>
      <Link href={href}>
        Découvrir
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Button>
  </Card>
);

const services = [
  {
    icon: <Truck className="h-12 w-12" />,
    title: "Transport d'objets",
    description: "Transport sécurisé de vos objets avec suivi en temps réel",
    href: "/services/transport"
  },
  {
    icon: <HomeIcon className="h-12 w-12" />,
    title: "Déménagement",
    description: "Service complet de déménagement avec personnel qualifié",
    href: "/services/demenagement"
  },
  {
    icon: <Package className="h-12 w-12" />,
    title: "Livraison",
    description: "Livraison rapide et fiable pour vos colis",
    href: "/services/livraison"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TransportPro</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Inscription</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Solutions de Transport et Déménagement
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simplifiez vos déplacements avec notre plateforme de gestion complète pour tous vos besoins en transport et déménagement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </main>
    </div>
  );
}