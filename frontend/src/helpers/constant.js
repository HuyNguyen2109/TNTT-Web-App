export const signupFields = [
  {
    label: "Tên thánh",
    value: "",
    required: true,
    size: {
      colMd: 4,
      colSM: 4,
      colXs: 12,
    },
    icon: "name",
    type: "text",
    error: false,
    key: 'holyName',
  },
  {
    label: "Họ",
    value: "",
    required: true,
    size: {
      colMd: 4,
      colSM: 4,
      colXs: 12,
    },
    icon: "name",
    type: "text",
    error: false,
    key: 'firstName'
  },
  {
    label: "Tên",
    value: "",
    required: true,
    size: {
      colMd: 4,
      colSM: 4,
      colXs: 12,
    },
    icon: "name",
    type: "text",
    error: false,
    key: 'lastName'
  },
  {
    label: "Địa chỉ",
    value: "",
    required: true,
    size: {
      colMd: 12,
      colSM: 12,
      colXs: 12,
    },
    icon: "address",
    type: "text",
    error: false,
    key: 'address'
  },
  {
    label: "Điện thoại",
    value: "",
    required: true,
    size: {
      colMd: 5,
      colSM: 5,
      colXs: 12,
    },
    icon: "phone",
    type: "tel",
    error: false,
    placeholder: 'VD: 038-123-4567',
    key: 'phoneNumber'
  },
  {
    label: "Email",
    value: "",
    required: true,
    size: {
      colMd: 7,
      colSM: 7,
      colXs: 12,
    },
    icon: "email",
    type: "text",
    error: false,
    placeholder: 'VD: testmail@someone.net',
    key: 'email'
  },
  {
    label: "Sinh Nhật",
    value: null,
    required: true,
    size: {
      colMd: 6,
      colSM: 6,
      colXs: 12,
    },
    icon: "date",
    type: "date",
    error: false,
    key: 'birthday'
  },
  {
    label: "Bổn mạng",
    value: null,
    required: true,
    size: {
      colMd: 6,
      colSM: 6,
      colXs: 12,
    },
    icon: "date",
    type: "date",
    error: false,
    key: 'holyBirthday'
  },
];

export const signinFields = [
  {
    label: 'Tài khoản/Email',
    type: 'text',
    key: 'username',
    isCustomAction: false,
  },
  {
    label: 'Mật khẩu',
    type: 'password',
    key: 'password',
    isCustomAction: true,
  }
]

export const sidebarItems = [
  {
    title: 'Chung',
    href: '/',
    icon: 'dashboard'
  },
];

export const forgotMessage = 'Bạn quên/không đăng nhập được tài khoản của mình? Nhập email bạn đã đăng kí tài khoản, hệ thống sẽ gửi lại mail xác nhận reset tài khoản cho bạn. Vui lòng theo dõi email để tiến hành lấy lại tài khoản'

export const TermAnConditions = [
  "Xứ Đoàn là một tổ chức Công Giáo phi lợi nhuận, vì thế:",
  "1. Xin không dùng trang web này vì mục đích lợi nhuận",
  "2. Các anh/chị là thành viên Xứ Đoàn khi được cấp tài khoản vui lòng không chia sẻ thông tin",
  "3. Khi tài khoản không truy cập được, vui lòng báo cho Ban Quản trị để được giải quyết",
  "4. Vì lí do nào đó, khi các anh/chị không còn phục vụ trong Xứ Đoàn, xin báo Ban Quản trị để xóa tài khoản",
];

