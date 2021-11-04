import axios from "axios";
// Temporary use
import faker from "faker";
import { v4 as uuidv4 } from 'uuid'

import rawText from "helpers/info.txt";

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
    for (let i = 0; i < 100; i++) {
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      responses.push({
        id: uuidv4(),
        firstName: firstName,
        lastName: lastName,
        phone: faker.phone.phoneNumber("(###) ###-####"),
        email: faker.internet.email(firstName, lastName),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
        },
      });
    }

    return Promise.resolve().then(() => {
      return responses;
    });
  },
};
