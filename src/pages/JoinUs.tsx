// Full updated script with Supabase logic inside the original professional UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Target, Users, Zap, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const JoinUs = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gameId: "",
    rank: "",
    experience: "",
    whyJoin: "",
    phone: "",
    availableHours: "",
  });

  const requirements = [
    { icon: Trophy, text: "مستوى احترافي في Free Fire", met: false },
    { icon: Target, text: "رانك ديامند أو أعلى", met: false },
    { icon: Users, text: "روح الفريق والتعاون", met: true },
    { icon: Zap, text: "الالتزام بجدول التدريب", met: true },
  ];

  const benefits = [
    "تدريب احترافي مع مدربين خبراء",
    "مشاركة في البطولات الكبرى",
    "دعم فني ومالي للمعدات",
    "شبكة علاقات واسعة في عالم الألعاب",
    "فرص رعاية وشراكات",
    "تطوير المهارات القيادية والإستراتيجية"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) {
        toast({
          title: "يجب تسجيل الدخول أولاً",
          description: "قم بتسجيل الدخول أو إنشاء حساب جديد للتقديم",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const { error } = await supabase
        .from("join_requests")
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          game_id: formData.gameId,
          phone_number: formData.phone,
          age: parseInt(formData.age),
          rank: formData.rank,
          experience: formData.experience,
          available_hours: formData.availableHours,
          why_join: formData.whyJoin,
          status: "new"
        });

      if (error) throw error;

      toast({
        title: "تم إرسال طلبك بنجاح!",
        description: "سنقوم بمراجعة طلبك والتواصل معك قريباً",
      });

      setFormData({
        fullName: "",
        email: "",
        age: "",
        gameId: "",
        rank: "",
        experience: "",
        whyJoin: "",
        phone: "",
        availableHours: "",
      });

    } catch (error: any) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gaming-primary to-gaming-secondary bg-clip-text text-transparent">
            انضم إلى S3M E-Sports
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            كن جزءاً من أقوى فريق ألعاب إلكترونية في المنطقة
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="text-gaming-primary text-2xl">نموذج التقديم</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white">الاسم الكامل *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="bg-black/20 border-gaming-primary/30 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-black/20 border-gaming-primary/30 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-white">العمر *</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        className="bg-black/20 border-gaming-primary/30 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gameId" className="text-white">معرف Free Fire *</Label>
                      <Input
                        id="gameId"
                        value={formData.gameId}
                        onChange={(e) => handleInputChange("gameId", e.target.value)}
                        className="bg-black/20 border-gaming-primary/30 text-white"
                        placeholder="123456789"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rank" className="text-white">الرانك الحالي *</Label>
                      <Select onValueChange={(value) => handleInputChange("rank", value)} required>
                        <SelectTrigger className="bg-black/20 border-gaming-primary/30 text-white">
                          <SelectValue placeholder="اختر رانكك" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-gaming-primary/30">
                          <SelectItem value="bronze">برونز</SelectItem>
                          <SelectItem value="silver">فضي</SelectItem>
                          <SelectItem value="gold">ذهبي</SelectItem>
                          <SelectItem value="platinum">بلاتيني</SelectItem>
                          <SelectItem value="diamond">ديامند</SelectItem>
                          <SelectItem value="master">ماستر</SelectItem>
                          <SelectItem value="grandmaster">جراند ماستر</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">رقمك الشخصي</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-black/20 border-gaming-primary/30 text-white"
                        placeholder="+99"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-white">سنوات الخبرة *</Label>
                    <Select onValueChange={(value) => handleInputChange("experience", value)} required>
                      <SelectTrigger className="bg-black/20 border-gaming-primary/30 text-white">
                        <SelectValue placeholder="اختر مستوى خبرتك" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-gaming-primary/30">
                        <SelectItem value="less-than-1">أقل من سنة</SelectItem>
                        <SelectItem value="1-2">1-2 سنة</SelectItem>
                        <SelectItem value="2-3">2-3 سنوات</SelectItem>
                        <SelectItem value="3-5">3-5 سنوات</SelectItem>
                        <SelectItem value="more-than-5">أكثر من 5 سنوات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availableHours" className="text-white">ساعات التفرغ اليومية *</Label>
                    <Select onValueChange={(value) => handleInputChange("availableHours", value)} required>
                      <SelectTrigger className="bg-black/20 border-gaming-primary/30 text-white">
                        <SelectValue placeholder="كم ساعة متاح يومياً؟" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-gaming-primary/30">
                        <SelectItem value="1-2">1-2 ساعة</SelectItem>
                        <SelectItem value="3-4">3-4 ساعات</SelectItem>
                        <SelectItem value="5-6">5-6 ساعات</SelectItem>
                        <SelectItem value="more-than-6">أكثر من 6 ساعات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whyJoin" className="text-white">لماذا تريد الانضمام؟ *</Label>
                    <Textarea
                      id="whyJoin"
                      value={formData.whyJoin}
                      onChange={(e) => handleInputChange("whyJoin", e.target.value)}
                      className="bg-black/20 border-gaming-primary/30 text-white min-h-[120px]"
                      placeholder="اكتب هنا دوافعك وأهدافك..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gaming-gradient hover:opacity-90 text-lg py-3"
                  >
                    {isSubmitting ? "جارٍ الإرسال..." : "إرسال الطلب"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="text-gaming-primary">متطلبات الانضمام</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      req.met ? 'bg-green-500/20' : 'bg-gaming-primary/20'
                    }`}>
                      {req.met ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <req.icon className="h-5 w-5 text-gaming-primary" />
                      )}
                    </div>
                    <span className="text-white/80 text-sm">{req.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="text-gaming-primary">مميزات العضوية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-gaming-accent mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="text-gaming-primary">تواصل معنا</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Discord Server</h4>
                  <Badge className="gaming-gradient">1234889046908731457</Badge>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">WhatsApp</h4>
                  <Badge className="bg-green-500">+966 50 123 4567</Badge>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Email</h4>
                  <Badge className="bg-gaming-secondary">team@s3mesports.com</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
