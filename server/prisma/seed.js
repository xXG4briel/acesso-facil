const { PrismaClient } = require('@prisma/client')
const bc = require('bcrypt-nodejs');
const { hashSync } = bc;

const prisma = new PrismaClient({ log: ['query'] });


async function main() {

  const visitors = [
    // Elon Musk
    {
      where: { email: 'elonmusk@outlook.com' },
      create: {
        address: {
          street: 'Rua dos Inventores, 123',
          city: 'Los Angeles',
          state: 'CA',
          country: 'Estados Unidos',
          zipCode: '12345',
        },
        birthday: new Date(/* Data de nascimento de Elon Musk */),
        identity: '123.456.789-10',
        identityType: 'cpf',
        password: hashSync('123456'),
        email: 'elonmusk@outlook.com',
        fullName: 'Elon Musk'
      },
      update: {}
    },
    // Bill Gates
    {
      where: { email: 'billgates@hotmail.com' },
      create: {
        address: {
          street: 'One Microsoft Way',
          city: 'Redmond',
          state: 'WA',
          country: 'Estados Unidos',
          zipCode: '98052',
        },
        birthday: new Date(/* Data de nascimento de Bill Gates */),
        identity: '987.654.321-00',
        identityType: 'cpf',
        password: hashSync('123456'),
        email: 'billgates@hotmail.com',
        fullName: 'Bill Gates'
      },
      update: {}
    },
    // Airton Senna
    {
      where: { email: 'ayrtonsenna@gmail.com' },
      create: {
        address: {
          street: 'Av. Ayrton Senna, 555',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
          zipCode: '12345-678',
        },
        birthday: new Date(/* Data de nascimento de Ayrton Senna */),
        identity: '111.222.333-44',
        identityType: 'cpf',
        password: hashSync('123456'),
        email: 'ayrtonsenna@gmail.com',
        fullName: 'Ayrton Senna'
      },
      update: {}
    },
    // Silvio Santos
    {
      where: { email: 'silviosantos@yahoo.com' },
      create: {
        address: {
          street: 'Av. das Comunicações, 123',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
          zipCode: '54321-098',
        },
        birthday: new Date(/* Data de nascimento de Silvio Santos */),
        identity: '222.333.444-55',
        identityType: 'cpf',
        password: hashSync('123456'),
        email: 'silviosantos@yahoo.com',
        fullName: 'Silvio Santos'
      },
      update: {}
    },
    // Terry Crews
    { 
      update: {},
      where: { email: "terrycrews@gmail.com" },
      create: {
        address: {
          street: "123 Muscle Street",
          city: "Los Angeles",
          state: "CA",
          country: "Estados Unidos",
          zipCode: "90210"
        },
        birthday: "1968-07-30T00:00:00.000Z",
        identity: "555.666.777-88",
        identityType: "cpf",
        password: "$2a$10$JzXN6dK8bJ5NxGwrp4g3..5Jb3lX2lQoWQvdWZsoVRxFZc2KvPpMm",
        email: "terrycrews@gmail.com",
        fullName: "Terry Crews"
      }
    },
    // Andrew Garfield
    { 
      update: {},
      where: { email: "andrewgarfield@hotmail.com" },
      create: {
        address: {
          street: "456 Actor's Lane",
          city: "London",
          state: "",
          country: "Reino Unido",
          zipCode: "W1F 7LW"
        },
        birthday: "1983-08-20T00:00:00.000Z",
        identity: "999.888.777-66",
        identityType: "cpf",
        password: "$2a$10$RAohCzqRfuIvz8k4xRl6BO1w/UD5Wbj11Yi9l2RSHGK/1XxhWQH4S",
        email: "andrewgarfield@hotmail.com",
        fullName: "Andrew Garfield"
      }
    },
    // Cillian Murphy
    { 
      update: {},
      where: { email: "cillianmurphy@yahoo.com" },
      create: {
        address: {
          street: "789 Theatre Road",
          city: "Dublin",
          state: "",
          country: "Irlanda",
          zipCode: "D01 KF59"
        },
        birthday: "1976-05-25T00:00:00.000Z",
        identity: "333.222.111-00",
        identityType: "cpf",
        password: "$2a$10$ONMWb5f3eWTHkR41hSDjNOy37gIjgvZwTOlmsAxHfWZrQzdp2qCv2",
        email: "cillianmurphy@yahoo.com",
        fullName: "Cillian Murphy"
      }
    }
  ];
  
  await Promise.all(
    visitors.map(({ create, update, where }) => 
      prisma.visitor.upsert({
        where,
        create,
        update
      })
    )
  )

  const companys = [
    {
      update: {},
      where: {email: 'info@intel.com'},
      create: {
        name: 'Intel',
        email: 'info@intel.com',
        identity: '12345678901235',
        identityType: 'cnpj',
        password: hashSync('123456'),
        address: {
            street: '123 Main Street',
            city: 'Santa Clara',
            state: 'CA',
            country: 'US',
            zipCode: '95054',
        },
      }
    },
    {
      update: {},
      where: {email: 'info@tesla.com'},
      create: {
        name: 'Tesla',
        email: 'info@tesla.com',
        identity: '12345678901236',
        identityType: 'cnpj',
        password: hashSync('123456'),
        address: {
            street: '123 Electric Avenue',
            city: 'Palo Alto',
            state: 'CA',
            country: 'US',
            zipCode: '94304',
        },
      }
    },
    {
      update: {},
      where: {email: 'info@samsung.com'},
      create: {
        name: 'Samsung',
        email: 'info@samsung.com',
        identity: '12345678901237',
        identityType: 'cnpj',
        password: hashSync('123456'),
        address: {
            street: '123 Samsung Street',
            city: 'Seoul',
            state: '',
            country: 'KR',
            zipCode: '123456',
        },
      }
    },
    {
      update: {},
      where: {email: 'info@petrobras.com'},
      create: {
        name: 'Petrobras',
        email: 'info@petrobras.com',
        identity: '12345678901238',
        identityType: 'cnpj',
        password: hashSync('123456'),
        address: {
            street: 'Avenida Chile',
            city: 'Rio de Janeiro',
            state: 'RJ',
            country: 'BR',
            zipCode: '20031-120',
        },
      }
    },
    {
      update: {},
      where: {email: 'info@vale.com'},
      create: {
        name: 'Vale',
        email: 'info@vale.com',
        identity: '12345678901239',
        identityType: 'cnpj',
        password: hashSync('123456'),
        address: {
            street: 'Avenida Graça Aranha',
            city: 'Rio de Janeiro',
            state: 'RJ',
            country: 'BR',
            zipCode: '20030-002',
        },
      }
    }
  ];
    
  await Promise.all(companys.map(({ create, update, where }) => prisma.company.upsert({ create, update, where })))

  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })