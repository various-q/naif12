import React from 'react';
import { 
  MessageSquare,
  Users,
  ClipboardList,
  TrendingUp,
  Calendar,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: 'المحادثات النشطة',
      value: '8',
      change: '+2 اليوم',
      color: 'blue'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'العملاء المدارون',
      value: '45',
      change: '+5 هذا الأسبوع',
      color: 'green'
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-purple-600" />,
      title: 'الاستبيانات المراجعة',
      value: '23',
      change: '+12 اليوم',
      color: 'purple'
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: 'تقييم الأداء',
      value: '4.9',
      change: 'ممتاز',
      color: 'yellow'
    }
  ];

  const activeTasks = [
    {
      id: 1,
      type: 'chat',
      title: 'رد على استفسار العميل أحمد محمد',
      priority: 'high',
      time: '10 دقائق',
      status: 'pending'
    },
    {
      id: 2,
      type: 'survey',
      title: 'مراجعة استبيان تقييم الخدمة',
      priority: 'medium',
      time: '25 دقيقة',
      status: 'in_progress'
    },
    {
      id: 3,
      type: 'support',
      title: 'معالجة تذكرة دعم فني #1234',
      priority: 'low',
      time: 'ساعة',
      status: 'pending'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'رد على محادثة العميل سارة أحمد',
      time: 'منذ 5 دقائق',
      type: 'chat'
    },
    {
      id: 2,
      action: 'راجع استبيان تقييم خدمة',
      time: 'منذ 15 دقيقة',
      type: 'survey'
    },
    {
      id: 3,
      action: 'أغلق تذكرة دعم #1230',
      time: 'منذ ساعة',
      type: 'support'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'عالية';
      case 'medium':
        return 'متوسطة';
      case 'low':
        return 'منخفضة';
      default:
        return 'عادية';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">
          مرحباً، {user?.name}!
        </h1>
        <p className="text-green-100">
          لوحة تحكم الموظف - إدارة العملاء والاستبيانات والدعم الفني
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
            <p className={`text-sm text-${stat.color}-600`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Tasks */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">المهام النشطة</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {getPriorityText(task.priority)}
                      </span>
                      <span className="text-sm text-gray-500">منذ {task.time}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
                    <div className="flex items-center gap-2">
                      {task.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : task.status === 'in_progress' ? (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-600">
                        {task.status === 'completed' ? 'مكتملة' : 
                         task.status === 'in_progress' ? 'قيد المعالجة' : 'في الانتظار'}
                      </span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    بدء المهمة
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            عرض جميع المهام
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">النشاط الأخير</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            عرض جميع الأنشطة
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {t('employee.live-chat')}
          </button>
          <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <ClipboardList className="w-5 h-5" />
            {t('employee.surveys')}
          </button>
          <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
            <Users className="w-5 h-5" />
            {t('employee.customers')}
          </button>
          <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
            <Star className="w-5 h-5" />
            تقييم الأداء
          </button>
        </div>
      </div>
    </div>
  );
};