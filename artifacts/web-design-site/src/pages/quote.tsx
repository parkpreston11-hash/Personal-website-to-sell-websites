import { useState, useEffect } from "wouter/use-location"; // ignore this, we use wouter differently
import { useLocation, useSearch } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const packages = {
  starter: { name: "Starter Website", price: 499 },
  business: { name: "Business Website", price: 999 },
  premium: { name: "Premium Website", price: 1999 },
};

const addOnsList = [
  { id: "ai_chatbot", name: "AI Chatbot", price: 299 },
  { id: "crm", name: "Connect to CRM/System", price: 499 },
  { id: "booking", name: "Booking Calendar", price: 199 },
  { id: "extra_page", name: "Extra Page", price: 99 },
  { id: "branding", name: "Logo/Branding Help", price: 149 },
  { id: "maintenance", name: "Monthly Maintenance", price: 99, isMonthly: true },
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  businessName: z.string().min(2, "Business name required"),
  packageId: z.enum(["starter", "business", "premium"]),
  addOns: z.array(z.string()),
  details: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function QuotePage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialPackage = searchParams.get("package") as keyof typeof packages | null;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessName: "",
      packageId: initialPackage && packages[initialPackage] ? initialPackage : "business",
      addOns: [],
      details: "",
    },
  });

  const selectedPackage = form.watch("packageId");
  const selectedAddOns = form.watch("addOns");

  const calculateTotal = () => {
    let total = packages[selectedPackage as keyof typeof packages]?.price || 0;
    selectedAddOns.forEach(id => {
      const addon = addOnsList.find(a => a.id === id);
      if (addon && !addon.isMonthly) {
        total += addon.price;
      }
    });
    return total;
  };

  const calculateMonthly = () => {
    let monthly = 0;
    selectedAddOns.forEach(id => {
      const addon = addOnsList.find(a => a.id === id);
      if (addon && addon.isMonthly) {
        monthly += addon.price;
      }
    });
    return monthly;
  };

  function onSubmit(data: FormValues) {
    const orderData = {
      ...data,
      total: calculateTotal(),
      monthly: calculateMonthly(),
    };
    localStorage.setItem("webcraft_order", JSON.stringify(orderData));
    setLocation("/checkout");
  }

  return (
    <div className="min-h-screen bg-secondary/20 pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">Build Your Quote</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Contact Info */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input placeholder="john@example.com" type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="businessName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl><Input placeholder="Acme Corp" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              {/* Package Selection */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Select Package</h2>
                  <FormField control={form.control} name="packageId" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                          {Object.entries(packages).map(([key, pkg]) => (
                            <FormItem key={key} className="relative">
                              <FormControl>
                                <RadioGroupItem value={key} className="peer sr-only" />
                              </FormControl>
                              <Label
                                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-background p-4 hover:bg-secondary/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                              >
                                <span className="font-semibold text-lg">{pkg.name}</span>
                                <span className="text-xl font-bold mt-2">${pkg.price}</span>
                              </Label>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Add-On Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addOnsList.map((addon) => (
                      <FormField
                        key={addon.id}
                        control={form.control}
                        name="addOns"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={addon.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(addon.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, addon.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== addon.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <div className="flex-1 flex justify-between leading-none">
                                <FormLabel className="font-medium cursor-pointer">
                                  {addon.name}
                                </FormLabel>
                                <span className="font-semibold text-primary">+${addon.price}{addon.isMonthly ? '/mo' : ''}</span>
                              </div>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Details */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Project Details</h2>
                  <FormField control={form.control} name="details" render={({ field }) => (
                    <FormItem>
                      <FormLabel>What kind of website do you want?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your business, your goals, and any specific features you need..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

            </div>

            {/* Right Column: Sticky Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-primary/20 shadow-xl">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Order Summary</h2>
                    
                    <div className="space-y-4">
                      {/* Package Summary */}
                      <div className="flex justify-between items-center font-medium">
                        <span>{packages[selectedPackage as keyof typeof packages]?.name}</span>
                        <span>${packages[selectedPackage as keyof typeof packages]?.price}</span>
                      </div>
                      
                      {/* Add-ons Summary */}
                      {selectedAddOns.length > 0 && (
                        <div className="space-y-2 pt-2 text-sm text-muted-foreground">
                          {selectedAddOns.map(id => {
                            const addon = addOnsList.find(a => a.id === id);
                            if (!addon) return null;
                            return (
                              <div key={id} className="flex justify-between items-center">
                                <span>+ {addon.name}</span>
                                <span>${addon.price}{addon.isMonthly ? '/mo' : ''}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                      
                      <Separator className="my-4" />
                      
                      {/* Totals */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="font-semibold">Estimated Total</span>
                          <span className="text-3xl font-bold text-primary">${calculateTotal()}</span>
                        </div>
                        {calculateMonthly() > 0 && (
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>Monthly Recurring</span>
                            <span className="font-semibold">${calculateMonthly()}/mo</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full mt-8 h-14 text-lg font-bold" data-testid="btn-continue-checkout">
                      Continue to Checkout
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      No payment required yet. We'll review your details first.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
