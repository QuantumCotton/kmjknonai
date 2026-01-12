import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MapPin, Sun, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-700">Energy Rebates & Incentives</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#states" className="text-gray-700 hover:text-blue-700 transition">Select Your State</a>
            <a href="#benefits" className="text-gray-700 hover:text-blue-700 transition">Benefits</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Government Incentives for Your Home Upgrades
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how federal, state, and utility incentives can pay for 30-50% of your energy efficiency upgrades. Choose your state to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-lg px-8 py-6"
              onClick={() => navigate("/florida")}
            >
              Florida <ChevronRight className="ml-2" />
            </Button>
            <Button 
              className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6"
              onClick={() => navigate("/south-carolina")}
            >
              South Carolina <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* State Selection */}
      <section id="states" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Choose Your State</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Each state offers unique incentives tailored to local climate and energy needs
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Florida Card */}
            <Card 
              className="border-2 border-blue-200 hover:shadow-2xl transition cursor-pointer overflow-hidden"
              onClick={() => navigate("/florida")}
            >
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-8 h-8 text-blue-700" />
                  <CardTitle className="text-3xl">Florida</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Sunshine State Energy Incentives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Florida homeowners benefit from federal tax credits, utility rebates from FPL and Duke Energy, and the My Safe Florida Home program for hurricane-hardening upgrades.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Federal 25C Credit</p>
                      <p className="text-gray-700">30% of cost, up to $3,200/year</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sun className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">My Safe Florida Home</p>
                      <p className="text-gray-700">Up to $10,000 for hurricane-hardening</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Utility Rebates</p>
                      <p className="text-gray-700">FPL & Duke Energy: Up to $1,420</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Popular Upgrades:</p>
                  <p className="text-gray-700">HVAC, Impact Windows, Insulation, Solar</p>
                </div>

                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-lg py-6"
                  onClick={() => navigate("/florida")}
                >
                  Explore Florida Incentives <ChevronRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* South Carolina Card */}
            <Card 
              className="border-2 border-green-200 hover:shadow-2xl transition cursor-pointer overflow-hidden"
              onClick={() => navigate("/south-carolina")}
            >
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-8 h-8 text-green-700" />
                  <CardTitle className="text-3xl">South Carolina</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Beaufort & Lowcountry Incentives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  South Carolina offers federal credits, state solar and fortification credits, plus utility rebates from Dominion Energy and Palmetto Electric. Perfect for hurricane-ready, energy-efficient homes.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Federal 25C Credit</p>
                      <p className="text-gray-700">30% of cost, up to $3,200/year</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sun className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">SC Solar Tax Credit</p>
                      <p className="text-gray-700">25% of cost, max $3,500/year</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Dominion & Palmetto Rebates</p>
                      <p className="text-gray-700">Up to $1,000+ for HVAC & geothermal</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Popular Upgrades:</p>
                  <p className="text-gray-700">Heat Pumps, Solar, Impact Windows, Spray Foam</p>
                </div>

                <Button 
                  className="w-full bg-green-700 hover:bg-green-800 text-lg py-6"
                  onClick={() => navigate("/south-carolina")}
                >
                  Explore SC Incentives <ChevronRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Why Act Now?</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Government incentives are available through 2025. Don't miss out on these opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-blue-700">
              <CardHeader>
                <CardTitle className="text-2xl">Save Up to 50%</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  When you combine federal tax credits, state incentives, utility rebates, and energy savings over 5 years, your true cost can be cut in half.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-700">
              <CardHeader>
                <CardTitle className="text-2xl">Immediate Rebates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Many utility rebates are applied instantly at purchase or mailed within weeks. Don't wait to start saving on your energy bills.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-700">
              <CardHeader>
                <CardTitle className="text-2xl">Home Value Increase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Energy-efficient upgrades increase your home's market value and appeal to buyers. Plus, you'll enjoy lower energy bills immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get a Free Audit</h3>
              <p className="text-gray-700">
                Many utilities offer free home energy audits to identify where you're losing energy and which upgrades will have the biggest impact.
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-700 text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Install Upgrades</h3>
              <p className="text-gray-700">
                Work with certified contractors to install energy-efficient upgrades. Make sure they're familiar with incentive requirements.
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-700 text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Claim Your Savings</h3>
              <p className="text-gray-700">
                Receive instant utility rebates, file for federal tax credits, and enjoy lower energy bills for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">When do I need to claim my federal tax credit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  You can claim the federal 25C tax credit through December 31, 2025. File IRS Form 5695 with your annual tax return. After 2025, the credit may be reduced or eliminated.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Can I get both a rebate and a tax credit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Yes! Utility rebates and federal tax credits are separate incentives. You can claim both. Just make sure to keep documentation of all incentives received.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What if my home is rented, not owned?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Most federal tax credits require you to own and live in your home. Renters may be eligible for utility rebates. Check with your utility company for renter-specific programs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">How long does it take to see energy savings?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  You'll see energy savings immediately on your next utility bill. Most upgrades pay for themselves within 5-10 years when you factor in incentives and energy savings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Select your state and explore the incentives available to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
              onClick={() => navigate("/florida")}
            >
              Florida <ChevronRight className="ml-2" />
            </Button>
            <Button 
              className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
              onClick={() => navigate("/south-carolina")}
            >
              South Carolina <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">About</h3>
              <p className="text-sm">Helping homeowners access government incentives for energy efficiency upgrades.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">States</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/florida" className="hover:text-white transition">Florida</a></li>
                <li><a href="/south-carolina" className="hover:text-white transition">South Carolina</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Energy Audit</a></li>
                <li><a href="#" className="hover:text-white transition">Tax Credits</a></li>
                <li><a href="#" className="hover:text-white transition">Contractors</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <p className="text-sm">Questions? We're here to help.</p>
              <p className="text-sm mt-2">Email: info@energyrebates.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 Energy Rebates & Incentives. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
