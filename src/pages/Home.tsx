import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { t, getDirection } = useLanguage();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'مدربون معتمدون',
      description: 'مدربون ذوو خبرة عالية ومعتمدون من الجهات المختصة'
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'شهادات معترف بها',
      description: 'شهادات قيادة معترف بها محلياً وإقليمياً'
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: 'مواعيد مرنة',
      description: 'جدولة مرنة تناسب ظروف وأوقات الطلاب'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      title: 'ضمان النجاح',
      description: 'برامج تدريب شاملة مع ضمان اجتياز اختبار القيادة'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/auth?register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                {t('hero.cta')}
                <ArrowRight className={`w-5 h-5 ${getDirection() === 'rtl' ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                to="/survey"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t('survey.title')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار مدرستنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم أفضل برامج تعليم القيادة مع ضمان الجودة والاحترافية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            هل أنت مستعد لبدء رحلة تعلم القيادة؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى آلاف الطلاب الذين تعلموا القيادة بأمان واحترافية معنا
          </p>
          <Link
            to="/auth?register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            سجل الآن
            <ArrowRight className={`w-5 h-5 ${getDirection() === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '5000+', label: 'طالب متخرج' },
              { number: '98%', label: 'معدل النجاح' },
              { number: '15+', label: 'سنة خبرة' },
              { number: '50+', label: 'مدرب معتمد' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};