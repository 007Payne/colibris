"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function DemenagementPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">TransportPro</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Service de Déménagement</h1>

          <Card className="p-6">
            <div className="space-y-8">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Adresses</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current">Adresse actuelle</Label>
                      <div className="flex gap-2 mt-1.5">
                        <Input
                          id="current"
                          placeholder="Saisissez votre adresse actuelle"
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="new">Nouvelle adresse</Label>
                      <div className="flex gap-2 mt-1.5">
                        <Input
                          id="new"
                          placeholder="Saisissez votre nouvelle adresse"
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
                  <h2 className="text-xl font-semibold">Type de logement</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentType">Logement actuel</Label>
                      <select
                        id="currentType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="studio">Studio</option>
                        <option value="t2">T2</option>
                        <option value="t3">T3</option>
                        <option value="t4">T4</option>
                        <option value="house">Maison</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="currentFloor">Étage</Label>
                      <Input
                        id="currentFloor"
                        type="number"
                        placeholder="Ex: 3"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="elevator" />
                    <label
                      htmlFor="elevator"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ascenseur disponible
                    </label>
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
                  <h2 className="text-xl font-semibold">Services supplémentaires</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="packing" />
                      <label
                        htmlFor="packing"
                        className="text-sm font-medium leading-none"
                      >
                        Service d&apos;emballage
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="furniture" />
                      <label
                        htmlFor="furniture"
                        className="text-sm font-medium leading-none"
                      >
                        Démontage/Remontage des meubles
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="cleaning" />
                      <label
                        htmlFor="cleaning"
                        className="text-sm font-medium leading-none"
                      >
                        Service de nettoyage
                      </label>
                    </div>
                  </div>

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