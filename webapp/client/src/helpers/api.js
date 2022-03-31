import axios from "axios";
// Temporary use
import faker from "faker";
import { v4 as uuidv4 } from 'uuid'

import rawText from "helpers/info.txt";

const classes = [
  {
    'id': uuidv4(),
    'title': 'Chiên con',
  },
  {
    'id': uuidv4(),
    'title': 'Khai Tâm 1A',
  },
  {
    'id': uuidv4(),
    'title': 'Khai Tâm 1B',
  },
  {
    'id': uuidv4(),
    'title': 'Khai Tâm 2A',
  },
  {
    'id': uuidv4(),
    'title': 'Khai Tâm 2B',
  },
  {
    'id': uuidv4(),
    'title': 'Rước Lễ 1A',
  },
  {
    'id': uuidv4(),
    'title': 'Rước Lễ 1B',
  },
  {
    'id': uuidv4(),
    'title': 'Thêm Sức 1A',
  },
  {
    'id': uuidv4(),
    'title': 'Thêm Sức 1B',
  },
  {
    'id': uuidv4(),
    'title': 'Thêm Sức 2A',
  },
  {
    'id': uuidv4(),
    'title': 'Thêm Sức 2B',
  },
  {
    'id': uuidv4(),
    'title': 'Bao Đồng 1',
  },
  {
    'id': uuidv4(),
    'title': 'Bao Đồng 2A',
  },
  {
    'id': uuidv4(),
    'title': 'Bao Đồng 2B',
  },
  {
    'id': uuidv4(),
    'title': 'Bao Đồng 3A',
  },
  {
    'id': uuidv4(),
    'title': 'Bao Đồng 3B',
  },
  {
    'id': uuidv4(),
    'title': 'Bao Đồng 4',
  },
  {
    'id': uuidv4(),
    'title': 'Vào Đời 1',
  },
  {
    'id': uuidv4(),
    'title': 'Vào Đời 2',
  },
]

export const html = {
  getContent: () => {
    return fetch(rawText)
      .then((res) => res.text())
      .then((text) => {
        return text;
      });
  },
};

export const dashboard = {
  // TODO: Call API to get all funds data for dashboard, below is sample data to create UI
  getFunds: () => {
    const response = {
      generalFund: {
        title: "Quỹ Thiếu Nhi",
        value: 100000000,
      },
      organizationFund: {
        title: "Quỹ Xứ Đoàn",
        value: 40200000,
      },
      membersCounting: {
        title: "Số lượng GLV",
        value: 45,
      },
      childrenCounting: {
        title: "Số lượng Thiếu Nhi",
        value: 600,
      },
    };

    return Promise.resolve().then(() => {
      return response;
    });
  },

  getMembersInfo: () => {
    // TODO: Call API to get all members data for dashboard, below is sample data to create UI
    let responses = [];
    for (let i = 0; i < 10; i++) {
      let holyName = faker.name.title();
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      responses.push({
        id: uuidv4(),
        avatar: null,
        holyName: holyName,
        firstName: firstName,
        lastName: lastName,
        birthday: {
          dateOfBirth: faker.date.between('01-01-1990', '31-12-1999'),
          holyDateOfBirth: faker.date.between('01-01-1990', '31-12-1999')
        },
        phone: faker.phone.phoneNumber("(###) ###-####"),
        email: faker.internet.email(firstName, lastName),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
        },
        area: Math.floor(Math.random()*4) + 1,
        class: classes[Math.floor(Math.random()*classes.length)]
      });
    }

    return Promise.resolve().then(() => {
      return responses;
    });
  },

  // TODO: Call API to get classes;
  getClasses: () => {
    return Promise.resolve().then(() => {
      return classes;
    })
  }
};
