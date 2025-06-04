
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, User, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  author_id: string | null;
}

interface NewsCardProps {
  news: NewsItem;
  onEdit?: (news: NewsItem) => void;
}

const NewsCard = ({ news, onEdit }: NewsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { userRole } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast({
        title: "تم الحذف",
        description: "تم حذف الخبر بنجاح",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في الحذف",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (window.confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
      deleteMutation.mutate(news.id);
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <Card className="gaming-card overflow-hidden">
      {news.image_url && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={news.image_url} 
            alt={news.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-s3m-red leading-tight">{news.title}</CardTitle>
          {isAdmin && onEdit && (
            <div className="flex gap-2 ml-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(news)}
                className="border-s3m-red/30 text-s3m-red hover:bg-s3m-red hover:text-white"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(news.created_at), 'PPP', { locale: ar })}</span>
          </div>
          {news.author_id && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>الإدارة</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-white/80 mb-4 leading-relaxed">
          {news.description}
        </p>
        
        {news.content && (
          <>
            {isExpanded && (
              <div className="text-white/80 mb-4 leading-relaxed whitespace-pre-wrap">
                {news.content}
              </div>
            )}
            
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-s3m-red hover:bg-s3m-red/10 p-0 h-auto font-normal"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  عرض أقل
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  قراءة المزيد
                </>
              )}
            </Button>
          </>
        )}
        
        {news.updated_at !== news.created_at && (
          <Badge variant="outline" className="mt-4 border-white/20 text-white/60">
            تم التحديث: {format(new Date(news.updated_at), 'PPP', { locale: ar })}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;
