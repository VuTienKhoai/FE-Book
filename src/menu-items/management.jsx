// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { ADMIN } from 'constants/Role';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const management = {
  id: 'management',
  title: 'Quản lý',
  type: 'group',
  children: [
    {
      id: 'book-management',
      title: 'Quản lý sách',
      type: 'item',
      url: '/book-management',
      icon: icons.ChromeOutlined
    },
    {
      id: 'post-management',
      title: 'Quản lý bài viết',
      type: 'item',
      url: '/post-management',
      icon: icons.ChromeOutlined
    },
    {
      id: 'user-management',
      title: 'Quản lý nhân viên',
      type: 'item',
      url: '/user-management',
      icon: icons.ChromeOutlined,
      requiredRole: ADMIN
    }
  ]
};

export default management;
