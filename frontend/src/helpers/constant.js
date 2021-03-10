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

export const HomePage = {
  'documentTitle': 'Xứ đoàn Anê Lê Thị Thành',
  'navHeight': 100,
  'navLinks': [
    {
      'key': 'home',
      'name': 'Trang chủ',
      'isActive': false
    },
    {
      'key': 'intro',
      'name': 'Giới thiệu',
      'isActive': false
    },
    {
      'key': 'schedule',
      'name': 'Lịch học',
      'isActive': false
    },
    {
      'key': 'team',
      'name': 'Ban quản trị',
      'isActive': false
    },
    {
      'key': 'contact',
      'name': 'Liên hệ',
      'isActive': false
    },
    {
      'key': 'signin',
      'name': 'Đăng nhập',
      'isActive': false
    },
  ],
  // TODO: replace avatar with real image get from database in the future
  'alphaKeyMembers': [
    {
      'key': 'leader',
      'name': 'Xứ Đoàn Trưởng',
      'avatar': '/Image-edited/Huy.png',
      'fullName': 'Phêrô Nguyễn Nhựt Huy'
    },
    {
      'key': 'sub-internal-leader',
      'name': 'Phó Nội Vụ',
      'avatar': '/Image-edited/Nam.png',
      'fullName': 'Vincente Lưu Nguyễn Nhật Nam'
    },
    {
      'key': 'sub-external-leader',
      'name': 'Phó Ngoại Vụ',
      'avatar': '/Image-edited/Lieu.png',
      'fullName': 'Maria Trịnh Thu Liễu'
    },
    {
      'key': 'secretary',
      'name': 'Thư Kí',
      'avatar': '/Image-edited/Trang.png',
      'fullName': 'Maria Nguyễn Thùy Trang'
    },
    {
      'key': 'treasurer',
      'name': 'Thủ Quỹ',
      'avatar': '/Image-edited/Ngoc.png',
      'fullName': 'Anna Nguyễn Lê Bảo Ngọc'
    },
    
  ],
  'saintIntro': {
    'name': 'Thánh Anê Lê Thị Thành (1781 - 1841)',
    'bigSentence': 'Con đừng khóc, mẹ mặc áo hoa hồng đấy, mẹ vui lòng chịu khổ vì Chúa Giêsu, sao con lại khóc?',
  },
  'slogans': [
    {
      'key': 'pray',
      'title': 'Cầu Nguyện',
      'desc': '<p>Thiếu nhi dâng ngày mỗi sáng</br>Làm cho đời sống hóa nên <strong>LỜI CẦU</strong></p>',
      'image': '/icons/pray.png'
    },
    {
      'key': 'communion',
      'title': 'Rước Lễ',
      'desc': '<p>Thiếu nhi <strong>TÔN SÙNG THÁNH THỂ</strong></br>Siêng năng Rước Lễ, Viếng Chúa hằng ngày.</p>',
      'image': '/icons/communion.png'
    },
    {
      'key': 'sacrifice',
      'title': 'Hy Sinh',
      'desc': '<p>Thiếu nhi <strong>HY SINH</strong> chịu khó</br>Luôn nhìn Thánh Giá, gặp khổ vẫn vui.</p>',
      'image': '/icons/sacrifice.png'
    },
    {
      'key': 'apostle',
      'title': 'Làm việc Tông Đồ',
      'desc': '<p>Thiếu nhi nhờ Mẹ cố gắng</br>Quyết làm gương sáng, xứng danh <strong>TÔNG ĐỒ</strong>.<p>',
      'image': '/icons/apostle.png'
    }
  ],
  'betaKeyMembers': [
    {
      'key': 'au-leader',
      'name': 'Trưởng Ấu',
      'avatar': '/Image-edited/Thu.png',
      'fullName': 'Maria Phạm Trần Anh Thư'
    },
    {
      'key': 'thieu-leader',
      'name': 'Trưởng Thiếu',
      'avatar': '/Image-edited/Hao.png',
      'fullName': 'Anna Lưu Nguyễn Hoàn Hảo'
    },
    {
      'key': 'nghia-leader',
      'name': 'Trưởng Nghĩa',
      'avatar': '/Image-edited/Phuong.png',
      'fullName': 'Têrêsa Kiều Nguyễn Xuân Phương'
    },
  ],
  'subGrandTitle': '"Từng bao người anh dũng tiến lên hy sinh vì tình yêu"',
  'learnMore': 'Tìm hiểu thêm',
  'scrollDownForMore': 'Cuộn xuống',
  'teamMemberTitle': 'Ban Quản trị',
  'scheduleTitle': 'Lịch học',
  'orgName': 'Xứ Đoàn Anê Lê Thị Thành',
  'facebookLink': 'https://www.facebook.com/thieunhicaothai',
  'gmailLink': 'altt.bandaidien@gmail.com',
  'location': '34/17 Vĩnh Thuận, P. Long Bình, Quận 9',
  'ggMapLocation': 'https://www.google.com/maps/search/nh%C3%A0+th%E1%BB%9D+Cao+Th%C3%A1i/@10.8836591,106.8190476,17z/data=!3m1!4b1',
  'contactUs': 'Liên hệ',
  'contactUsSubtitle': 'Luôn cập nhật những thông báo mới nhất, hoặc có bất kì phản hồi nào về Xứ Đoàn',
  'dayClassTitle': 'Lớp sáng',
  'dayClassDesc': 'Các em thiếu nhi sẽ tập trung tại Nhà thờ tham dự Thánh Lễ Chúa Nhật lúc 6h30, sau đó sẽ được hướng dẫn di chuyển vào Nhà Sinh Hoạt Mục Vụ ăn sáng và bắt đầu giờ học giáo lý lúc 8h30, buổi học được kết thúc lúc 9h30.',
  'nightClassTitle': 'Lớp tối',
  'nightClassDesc': 'Các em tham dự Thánh Lễ chiều thứ 7, sau đó di chuyển vào Nhà Sinh Hoạt Mục Vụ và bắt đầu giờ học Giáo Lý, kết thúc lúc 20h. Các em vẫn tham dự Thánh Lễ Thiếu Nhi ngày Chúa Nhật và cùng ăn sáng như các bạn khác, sau đó có thể ra về.'
}

