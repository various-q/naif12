import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const surveySchema = z.object({
  overallSatisfaction: z.number().min(1).max(5),
  instructorRating: z.number().min(1).max(5),
  facilityRating: z.number().min(1).max(5),
  recommendToOthers: z.enum(['yes', 'no']),
  improvements: z.string().optional(),
  comments: z.string().min(10, 'التعليقات يجب أن تكون 10 أحرف على الأقل'),
  contactInfo: z.string().optional(),
});

type SurveyData = z.infer<typeof surveySchema>;

export const Survey: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
  });

  const watchedRatings = {
    overall: watch('overallSatisfaction', 0),
    instructor: watch('instructorRating', 0),
    facility: watch('facilityRating', 0),
  };

  const RatingStars = ({ 
    value, 
    onChange, 
    name 
  }: { 
    value: number; 
    onChange: (rating: number) => void; 
    name: string;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 transition-colors"
          >
            <Star
              className={`w-8 h-8 ${
                star <= value
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const onSubmit = async (data: SurveyData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Survey Data:', data);
      toast.success('تم إرسال التقييم بنجاح! شكراً لك على وقتك الثمين');
      setSubmitted(true);
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            شكراً لك!
          </h2>
          <p className="text-gray-600 mb-6">
            تم إرسال تقييمك بنجاح. نقدر وقتك وملاحظاتك القيمة التي ستساعدنا في تحسين خدماتنا.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            إرسال تقييم آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-t-lg">
            <h1 className="text-3xl font-bold mb-2">{t('survey.title')}</h1>
            <p className="text-blue-100 text-lg">
              {t('survey.description')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Overall Satisfaction */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                1. ما هو مستوى رضاك العام عن خدماتنا؟ *
              </label>
              <RatingStars
                value={watchedRatings.overall}
                onChange={(rating) => setValue('overallSatisfaction', rating)}
                name="overallSatisfaction"
              />
              {errors.overallSatisfaction && (
                <p className="text-red-600 text-sm">يرجى اختيار تقييم من 1 إلى 5</p>
              )}
            </div>

            {/* Instructor Rating */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                2. كيف تقيم أداء المدرب؟ *
              </label>
              <RatingStars
                value={watchedRatings.instructor}
                onChange={(rating) => setValue('instructorRating', rating)}
                name="instructorRating"
              />
              {errors.instructorRating && (
                <p className="text-red-600 text-sm">يرجى اختيار تقييم من 1 إلى 5</p>
              )}
            </div>

            {/* Facility Rating */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                3. كيف تقيم مرافق المدرسة؟ *
              </label>
              <RatingStars
                value={watchedRatings.facility}
                onChange={(rating) => setValue('facilityRating', rating)}
                name="facilityRating"
              />
              {errors.facilityRating && (
                <p className="text-red-600 text-sm">يرجى اختيار تقييم من 1 إلى 5</p>
              )}
            </div>

            {/* Recommendation */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                4. هل تنصح الآخرين بمدرستنا؟ *
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register('recommendToOthers')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>نعم</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register('recommendToOthers')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>لا</span>
                </label>
              </div>
              {errors.recommendToOthers && (
                <p className="text-red-600 text-sm">يرجى اختيار إجابة</p>
              )}
            </div>

            {/* Improvements */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                5. ما هي الجوانب التي ترى أنها تحتاج إلى تحسين؟
              </label>
              <div className="space-y-2">
                {[
                  'جودة التدريب',
                  'مواعيد الدروس',
                  'المرافق والمعدات',
                  'خدمة العملاء',
                  'الأسعار',
                  'أخرى'
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={option}
                      {...register('improvements')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                6. تعليقات إضافية أو اقتراحات *
              </label>
              <textarea
                {...register('comments')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="شاركنا رأيك وملاحظاتك..."
              />
              {errors.comments && (
                <p className="text-red-600 text-sm">{errors.comments.message}</p>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                7. معلومات التواصل (اختياري)
              </label>
              <input
                type="text"
                {...register('contactInfo')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="البريد الإلكتروني أو رقم الهاتف"
              />
              <p className="text-sm text-gray-500">
                يمكن استخدام هذه المعلومات للتواصل معك في حال الحاجة لتوضيحات إضافية
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('survey.submit')}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};