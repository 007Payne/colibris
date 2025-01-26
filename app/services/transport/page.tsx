"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function TransportPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">TransportPro</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Transport d&apos;objets</h1>

          <Card className="p-6">
            <div className="space-y-8">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Adresses</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pickup">Adresse de départ</Label>
                      <div className="flex gap-2 mt-1.5">
                        <Input
                          id="pickup"
                          placeholder="Saisissez l'adresse de départ"
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="delivery">Adresse de livraison</Label>
                      <div className="flex gap-2 mt-1.5">
                        <Input
                          id="delivery"
                          placeholder="Saisissez l'adresse de livraison"
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full">
                    Continuer
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Date et horaire</h2>
                  
                  <div>
                    <Label htmlFor="date">Date souhaitée</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        id="date"
                        type="date"
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="time">Heure</Label>
                      <Input
                        id="time"
                        type="time"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Retour
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Continuer
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Détails de la cargaison</h2>
                  
                  <div>
                    <Label htmlFor="weight">Poids approximatif (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Ex: 100"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="volume">Volume approximatif (m³)</Label>
                    <Input
                      id="volume"
                      type="number"
                      placeholder="Ex: 2"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description des objets</Label>
                    <textarea
                      id="description"
                      className="mt-1.5 w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Décrivez les objets à transporter..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Retour
                    </Button>
                    <Button className="flex-1">
                      Obtenir un devis
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}