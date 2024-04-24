const { PrismaClient } = require('@prisma/client')
const bc = require('bcrypt-nodejs');
const { hashSync } = bc;

const prisma = new PrismaClient();


async function main() {

    // const companys = await prisma.company.createMany({
    //     data: [
    //         {
    //             name: 'Intel',
    //             email: 'info@intel.com',
    //             identity: '12345678901235',
    //             identityType: 'cnpj',
    //             password: hashSync('123456'),
    //             address: {
    //                 street: '123 Main Street',
    //                 city: 'Santa Clara',
    //                 state: 'CA',
    //                 country: 'US',
    //                 zipCode: '95054',
    //             },
    //           },
    //           {
    //             name: 'Tesla',
    //             email: 'info@tesla.com',
    //             identity: '12345678901236',
    //             identityType: 'cnpj',
    //             password: hashSync('123456'),
    //             address: {
    //                 street: '123 Electric Avenue',
    //                 city: 'Palo Alto',
    //                 state: 'CA',
    //                 country: 'US',
    //                 zipCode: '94304',
    //             },
    //           },
    //           {
    //             name: 'Samsung',
    //             email: 'info@samsung.com',
    //             identity: '12345678901237',
    //             identityType: 'cnpj',
    //             password: hashSync('123456'),
    //             address: {
    //                 street: '123 Samsung Street',
    //                 city: 'Seoul',
    //                 state: '',
    //                 country: 'KR',
    //                 zipCode: '123456',
    //             },
    //           },
    //           {
    //             name: 'Petrobras',
    //             email: 'info@petrobras.com',
    //             identity: '12345678901238',
    //             identityType: 'cnpj',
    //             password: hashSync('123456'),
    //             address: {
    //                 street: 'Avenida Chile',
    //                 city: 'Rio de Janeiro',
    //                 state: 'RJ',
    //                 country: 'BR',
    //                 zipCode: '20031-120',
    //             },
    //           },
    //           {
    //             name: 'Vale',
    //             email: 'info@vale.com',
    //             identity: '12345678901239',
    //             identityType: 'cnpj',
    //             password: hashSync('123456'),
    //             address: {
    //                 street: 'Avenida Graça Aranha',
    //                 city: 'Rio de Janeiro',
    //                 state: 'RJ',
    //                 country: 'BR',
    //                 zipCode: '20030-002',
    //             },
    //           },
    //     ]
    // });
    
    // console.log(companys)

    // const visitors = await prisma.visitor.createMany({
    //     data: [
    //         {
    //             name: 'John Doe',
    //             email: 'john@example.com',
    //             phone: '1234567890',
    //             companyId: companys[0].id
    //         },
    //     ]
    // });
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