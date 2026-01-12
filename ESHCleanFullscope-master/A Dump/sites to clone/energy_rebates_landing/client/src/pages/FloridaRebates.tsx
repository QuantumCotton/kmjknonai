import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, DollarSign, Home, Lightbulb, Zap, Leaf, Sun } from "lucide-react";

export default function FloridaRebates() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-700">Energy Rebates</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#process" className="text-gray-700 hover:text-blue-700 transition">Process</a>
            <a href="#upgrades" className="text-gray-700 hover:text-blue-700 transition">Upgrades</a>
            <a href="#calculator" className="text-gray-700 hover:text-blue-700 transition">Calculator</a>
            <Button className="bg-blue-700 hover:bg-blue-800">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Pay for Your Home Upgrades with Government Incentives
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Tired of high energy bills? What if you could make your home more comfortable and efficient, and have government programs pay for a significant portion of the cost? It's not a gimmick. Federal, state, and utility incentives are designed to help Florida homeowners like you invest in a more resilient and affordable future.
              </p>
              <div className="flex gap-4">
                <Button className="bg-blue-700 hover:bg-blue-800 text-lg px-8 py-6">
                  Explore Incentives <ChevronRight className="ml-2" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-6">Learn More</Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/florida-hero-thermal.jpg" 
                alt="Thermal imaging showing heat loss in a home" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <p className="text-sm font-semibold text-gray-900">Thermal imaging reveals where your home loses energy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Simple 3-Step Process</h2>
            <p className="text-xl text-gray-600">Getting these upgrades and claiming your incentives is straightforward</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="border-2 border-blue-200 hover:shadow-lg transition">
              <CardHeader className="bg-blue-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">1</div>
                  <CardTitle className="text-2xl">Audit</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  It starts with a professional Home Energy Audit to identify where your home is losing the most energy. Many utilities, like Duke Energy, offer free Home Energy Checks. This provides a roadmap for the most impactful, cost-saving upgrades.
                </p>
                <div className="flex items-center text-blue-700 font-semibold">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Free assessments available
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-2 border-green-200 hover:shadow-lg transition">
              <CardHeader className="bg-green-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">2</div>
                  <CardTitle className="text-2xl">Install</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  Once you know what you need, hire a qualified contractor to install upgrades like high-SEER HVAC, impact windows, or attic insulation. Ensure your contractor uses products that meet the specific efficiency requirements for the incentives.
                </p>
                <div className="flex items-center text-green-700 font-semibold">
                  <Home className="w-5 h-5 mr-2" />
                  Certified contractors available
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-2 border-amber-200 hover:shadow-lg transition">
              <CardHeader className="bg-amber-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold">3</div>
                  <CardTitle className="text-2xl">Claim</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  After installation, you'll claim your savings. This could be an instant rebate from your utility, a grant from a state program, or a tax credit when you file your annual taxes.
                </p>
                <div className="flex items-center text-amber-700 font-semibold">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Multiple rebate options
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rebate vs Credit Explanation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Understanding the Incentives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-blue-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">Rebate (Cash Now)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  A direct reduction in the purchase price or a check mailed to you after the purchase. These are typically offered by utility companies like FPL and Duke Energy.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Example:</p>
                  <p className="text-gray-700">Duke Energy offers up to $1,000 for HVAC replacement</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-700">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700">Tax Credit (Lower Taxes Later)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  A dollar-for-dollar reduction of your federal income tax liability. You claim this when you file your taxes using IRS Form 5695.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Example:</p>
                  <p className="text-gray-700">Federal 25C credit: 30% of cost, up to $3,200/year</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Upgrades and Incentives Table */}
      <section id="upgrades" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Key Upgrades and Available Incentives</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Here are some of the most popular and impactful upgrades for Florida homes, and the incentives available for them
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Upgrade</th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Federal Credit (25C)</th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Florida Specifics</th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Utility Rebates</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">High-SEER HVAC</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">30% of cost, up to <strong>$2,000</strong></td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">N/A</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Up to <strong>$1,000</strong> (FPL/Duke)</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Insulation & Air Sealing</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">30% of cost, up to <strong>$1,200</strong>/yr</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">N/A</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Up to <strong>$1,420</strong> combined (FPL)</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Impact Windows & Doors</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">30% of cost, up to <strong>$600</strong> windows, <strong>$500</strong> doors</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700"><strong>My Safe Florida Home</strong> grant up to <strong>$10,000</strong></td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Up to <strong>$800</strong> (Duke)</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Solar Panels</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700"><strong>30%</strong> of total cost</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Sales tax exemption + property tax exemption</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Visual Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">See the Difference</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <img 
                src="/images/florida-concept-savings.jpg" 
                alt="Hand holding glowing house model with dollar signs" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <p className="text-center text-gray-600 mt-4 font-semibold">Your savings potential visualized</p>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Maximize Your Savings</h3>
              <p className="text-lg text-gray-700 mb-6">
                Government incentives can cover 30-50% of your upgrade costs. When combined with energy savings over 5-10 years, your net cost becomes dramatically lower than the initial investment.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>Federal credits</strong> up to $3,200 per year</span>
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>Utility rebates</strong> for immediate savings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Home className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>State programs</strong> like My Safe Florida Home</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Professional Installation</h3>
              <p className="text-lg text-gray-700 mb-6">
                Proper installation is key to maximizing both efficiency and incentive eligibility. Our network of certified contractors ensures your upgrades meet all requirements for federal and state incentives.
              </p>
              <Button className="bg-blue-700 hover:bg-blue-800 w-fit text-lg px-6 py-3">
                Find Certified Contractors
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="/images/florida-insulation-installation.jpg" 
                alt="Technician spraying blown-in insulation in attic" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <p className="text-center text-gray-600 mt-4 font-semibold">Professional blown-in insulation installation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Window Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Impact Windows: Energy Savings + Storm Protection</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img 
              src="/images/florida-window-comparison.jpg" 
              alt="Old single-pane window vs new energy-efficient window" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Upgrade Your Windows</h3>
              <p className="text-lg text-gray-700 mb-6">
                Energy-efficient impact windows provide dual benefits: they reduce your energy bills by up to 30% while protecting your home from hurricanes and storms.
              </p>
              <div className="space-y-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Federal Tax Credit</p>
                  <p className="text-gray-700">30% of cost, up to $600 per window</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">My Safe Florida Home</p>
                  <p className="text-gray-700">Up to $10,000 grant for hurricane-hardening</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Utility Rebates</p>
                  <p className="text-gray-700">Up to $800 from Duke Energy</p>
                </div>
              </div>
              <Button className="bg-blue-700 hover:bg-blue-800 text-lg px-6 py-3">
                Get Window Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">The ROI Calculator</h2>
          <p className="text-center text-gray-700 mb-12 text-lg">
            See how the numbers work: A $10,000 HVAC Replacement Example
          </p>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Cost/Benefit</th>
                  <th className="px-6 py-4 text-right font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Initial Project Cost</td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-gray-900">$10,000</td>
                  <td className="px-6 py-4 text-gray-700">High-efficiency heat pump installation</td>
                </tr>
                <tr className="border-b border-gray-200 bg-green-50 hover:bg-green-100">
                  <td className="px-6 py-4 font-semibold text-gray-900">Federal Tax Credit (25C)</td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-green-700">-$2,000</td>
                  <td className="px-6 py-4 text-gray-700">30% credit, capped at $2,000 for heat pumps</td>
                </tr>
                <tr className="border-b border-gray-200 bg-blue-50 hover:bg-blue-100">
                  <td className="px-6 py-4 font-semibold text-gray-900">Utility Rebate</td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-blue-700">-$600</td>
                  <td className="px-6 py-4 text-gray-700">Example rebate from Duke Energy</td>
                </tr>
                <tr className="border-b border-gray-200 bg-amber-50 hover:bg-amber-100">
                  <td className="px-6 py-4 font-semibold text-gray-900">Energy Savings (5 Years)</td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-amber-700">-$4,500</td>
                  <td className="px-6 py-4 text-gray-700">Estimated savings from more efficient system</td>
                </tr>
                <tr className="bg-gray-900 text-white">
                  <td className="px-6 py-4 font-bold text-lg">Net Cost After 5 Years</td>
                  <td className="px-6 py-4 text-right font-bold text-2xl">$2,900</td>
                  <td className="px-6 py-4">A 71% reduction in your initial investment</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">71%</CardTitle>
                <CardDescription>Cost Reduction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Your true investment after incentives and savings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-green-700">$7,100</CardTitle>
                <CardDescription>Total Incentives</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Federal credits, rebates, and energy savings combined</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-amber-700">5 Years</CardTitle>
                <CardDescription>Payback Period</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">After which the system pays for itself</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solar Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Solar Panels: Long-Term Energy Independence</h2>
              <p className="text-lg text-gray-700 mb-6">
                Solar panels are one of the most impactful investments you can make. Florida's abundant sunshine makes solar an excellent choice, and the incentives are substantial.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <Sun className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Federal Tax Credit: 30%</p>
                    <p className="text-gray-700">Of your total system cost</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Leaf className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Sales Tax Exemption</p>
                    <p className="text-gray-700">On solar equipment in Florida</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Home className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Property Tax Exemption</p>
                    <p className="text-gray-700">On the added home value from solar</p>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-700 hover:bg-blue-800 text-lg px-6 py-3">
                Get Solar Quote
              </Button>
            </div>
            <img 
              src="/images/florida-solar-home.jpg" 
              alt="Modern Florida home with solar panels" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* IRS Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img 
              src="/images/florida-irs-form-5695.jpg" 
              alt="IRS Form 5695 for Residential Energy Credits" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Claiming Your Federal Tax Credit</h2>
              <p className="text-lg text-gray-700 mb-6">
                To claim your federal tax credit, you'll need to file IRS Form 5695 (Residential Energy Credits) with your annual tax return. Keep all receipts and documentation from your contractor.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">What You'll Need:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-700 rounded-full"></span>
                    Contractor invoices and receipts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-700 rounded-full"></span>
                    Proof of installation completion
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-700 rounded-full"></span>
                    Energy efficiency certification documents
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-700 rounded-full"></span>
                    Your home address and property details
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 mb-4">
                The federal tax credit can be claimed through December 31, 2025. After that date, the credit may be reduced or eliminated, so act now to maximize your savings.
              </p>
              <Button className="bg-blue-700 hover:bg-blue-800 text-lg px-6 py-3">
                Learn More About Form 5695
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Energy Upgrade?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free home energy audit and discover how much you can save with government incentives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6">
              Get Free Audit
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-blue-800 text-lg px-8 py-6">
              Explore More
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
              <p className="text-sm">Helping Florida homeowners access government incentives for energy efficiency.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Energy Audit</a></li>
                <li><a href="#" className="hover:text-white transition">Find Contractors</a></li>
                <li><a href="#" className="hover:text-white transition">Tax Credits</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Incentives</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Federal Credits</a></li>
                <li><a href="#" className="hover:text-white transition">Utility Rebates</a></li>
                <li><a href="#" className="hover:text-white transition">State Programs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <p className="text-sm">Questions? We're here to help.</p>
              <p className="text-sm mt-2">Email: info@energyrebates.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 Energy Rebates. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
