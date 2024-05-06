const { PrismaClient } = require('@prisma/client')
const bc = require('bcrypt-nodejs');
const { hashSync } = bc;

const prisma = new PrismaClient({ log: ['query'] });


async function main() {

  await prisma.$queryRaw`TRUNCATE "visitors", "visits", "companys"`;

  //#region visitors
  const visitorsDefaults = {
    elonMusk: 'daab9f5e-7afa-4407-9d80-8342870c8bd6',
    billGates: 'a9fd259b-bb5e-4ba9-be72-bafdf721427d',
    ayrtonSenna: 'cc556f97-b357-4a50-b157-d648514c62b4',
    gabrielFAM: '84754299-ac7b-44af-9345-d52f729a13ce'
  }
  const visitors = [
    // Elon Musk
    {
      where: { email: 'elonmusk@outlook.com' },
      create: {
        id: visitorsDefaults.elonMusk,
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
        url: 'https://gaqszvrwzgivtxcnpqgk.supabase.co/storage/v1/object/public/register/musk.jpg',
        phone: '11912345678',
        role: 'Engenheiro',
        fullName: 'Elon Musk'
      },
      update: {}
    },
    // Bill Gates
    {
      where: { email: 'billgates@hotmail.com' },
      create: {
        id: visitorsDefaults.billGates,
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
        url: 'https://gaqszvrwzgivtxcnpqgk.supabase.co/storage/v1/object/public/register/bill-gates.jpg',
        phone: '11912345678',
        role: 'Programador',
        fullName: 'Bill Gates'
      },
      update: {}
    },
    // Ayrton Senna
    {
      where: { email: 'ayrtonsenna@gmail.com' },
      create: {
        id: visitorsDefaults.ayrtonSenna,
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
        url: 'https://gaqszvrwzgivtxcnpqgk.supabase.co/storage/v1/object/public/register/senna.jpg',
        phone: '11912345678',
        role: 'Consultor',
        fullName: 'Ayrton Senna',
      },
      update: {}
    },
    // Gabriel FAM ( Desenvolvedor )
    {
      where: { email: 'gabriel.computacao@fam.com.br' },
      create: {
        id: visitorsDefaults.gabrielFAM,
        address: {
          street: 'Av. das Comunicações, 123',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
          number: 42,
          zipCode: '04044-000',
        },
        url: 'https://gaqszvrwzgivtxcnpqgk.supabase.co/storage/v1/object/public/register/gabriel-fam.jpg',
        birthday: new Date(2002, 10, 7),
        identity: '123.456.789-00',
        identityType: 'cpf',
        password: hashSync('123456'),
        email: 'gabriel.computacao@fam.com.br',
        phone: '11912345678',
        role: 'Engenheiro',
        fullName: 'Gabriel FAM'
      },
      update: {}
    },
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
  //#endregion

  //#region companys
  const companysDefaults = {
    intel: '23448163-d545-439f-9f38-5b4d8d2977d2',
    tesla: 'dd303319-02e5-4349-bf4b-aa773d2718b7',
    samsung: '3417fd9a-d4c5-4fd2-bd0b-d5cbb7d37e34',
    petrobras: '6b505a0d-b530-4b76-b7b8-fefbf4424eb0',
    vale: '8860aad2-6f58-41d0-9e12-89daa42d3f9a'
  }
  const companys = [
    {
      update: { },
      where: { id: companysDefaults.intel },
      create: {
        id: companysDefaults.intel,
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
            number: 5,
            zipCode: '95054',
        },
      }
    },
    {
      update: {
      },
      where: { id: companysDefaults.tesla },
      create: {
        id: companysDefaults.tesla,
        name: 'Tesla',
        email: 'info@tesla.com',
        identity: '12345678901236',
        identityType: 'cnpj',
        password: hashSync('123456'),
        url: 'https://static.vecteezy.com/ti/vetor-gratis/p3/20336735-tesla-logotipo-tesla-icone-transparente-png-gratis-vetor.jpg',
        address: {
            street: '123 Electric Avenue',
            city: 'Palo Alto',
            state: 'CA',
            country: 'US',
            number: 42,
            zipCode: '94304',
        },
      }
    },
    {
      update: {},
      where: { id: companysDefaults.samsung },
      create: {
        id: companysDefaults.samsung,
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
            number: 65,
            zipCode: '123456',
        },
      }
    },
    {
      update: {},
      where: { id: companysDefaults.petrobras },
      create: {
        id: companysDefaults.petrobras,
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
            number: 77,
            zipCode: '20031-120',
        },
      }
    },
    {
      update: {},
      where: { id: companysDefaults.vale },
      create: {
        id: companysDefaults.vale,
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
            number: 89,
            zipCode: '20030-002',
        },
      }
    }
  ];
    
  await Promise.all(
    companys.map(({ create, update, where }) => 
      prisma.company.upsert({ create, update, where }))
  )
  //#endregion

  const visitsId = [
    'c05ca1da-e2b1-469c-bce5-79ae13939093',
    'bd500660-9010-4e43-9abc-64a7f3afbb2d',
    '9b99a86e-accc-4323-844c-e50313113697',
    '85300a44-0bfe-4394-98f2-b3f4d5c02732',
    '91eb9d7f-e979-4264-b651-56ac8460bd8d',
    '0b72f488-1754-4f05-a1ef-50b244585aab',
    '2289c9da-8ae4-4e7d-9227-4e7bc7c033d7',
    'e278d687-eaef-44a6-99a7-cd578870c732',
    '8a4043cf-1ad3-4380-bd5b-9e74c41c01f4',
    'b85f81f3-6f0d-4fb8-8e09-69d364f64d60',
    '08bce0bb-24b8-499c-bfcb-eb8fffefb00f'
  ]

  const visits = [

    // AGUARDANDO

    // 0
    {
      where: { id: visitsId[0] },
      create: {
        id: visitsId[0],
        visitorId: visitorsDefaults.ayrtonSenna,
        companyId: companysDefaults.tesla,
        approved: false,
        description: 'Verificar Carro tesla',
        scheduledDate: new Date(2024, 6, 21, 5, 20),
        files:[{"name": "CREA.pdf"}, {"name": "RG.pdf"}],
      },
      update: { 
      }
    },
    // 1
    {
      where: { id: visitsId[1] },
      create: {
        id: visitsId[1],
        visitorId: visitorsDefaults.ayrtonSenna,
        companyId: companysDefaults.tesla,
        description: 'Opinião Design do tesla',
        scheduledDate: new Date(2024, 6, 21, 5, 45),
        files:[{"name": "RG.pdf"}],
      },
      update: { 
      }
    },
    // 2
    {
      where: { id: visitsId[2] },
      create: {
        id: visitsId[2],
        visitorId: visitorsDefaults.elonMusk,
        companyId: companysDefaults.tesla,
        description: 'Visita',
        scheduledDate: new Date(2024, 6, 21, 6, 0),
        files:[{"name": "RG.pdf"}],
      },
      update: { 
      }
    },
    // 3
    {
      where: { id: visitsId[3] },
      create: {
        id: visitsId[3],
        visitorId: visitorsDefaults.gabrielFAM,
        companyId: companysDefaults.tesla,
        description: 'Fazer manunteção no servidor',
        scheduledDate: new Date(2024, 6, 21, 5, 20),
        files:[{"name": "Documento.pdf"}, {"name": "Habilitação.pdf"}],
      },
      update: { 
      }
    },
    // 4
    {
      where: { id: visitsId[4] },
      create: {
        id: visitsId[4],
        visitorId: visitorsDefaults.ayrtonSenna,
        companyId: companysDefaults.petrobras,
        description: 'Test drive F1 Tesla',
        approved: true,
        finished: true,
        scheduledDate: new Date(2024, 6, 21, 7, 15),
        files:[{"name": "Solicitacao teste.pdf"}, {"name": "Carteira.pdf"}, {"name": "RG.pdf"}],
      },
      update: { 
      }
    },
    // 5
    {
      where: { id: visitsId[5] },
      create: {
        id: visitsId[5],
        visitorId: visitorsDefaults.billGates,
        companyId: companysDefaults.tesla,
        approved: true,
        description: 'Parceira com a tesla',
        scheduledDate: new Date(2024, 4, 22, 5, 30),
        files:[{"name": "Documentacao.pdf"}, {"name": "RG.pdf"}],
      },
      update: { 
      }
    },

    // AUTORIZADO

    // 6
    {
      where: { id: visitsId[6] },
      create: {
        id: visitsId[6],
        visitorId: visitorsDefaults.elonMusk,
        companyId: companysDefaults.tesla,
        approved: true,
        description: 'Visita',
        scheduledDate: new Date(2024, 6, 21, 5, 20),
        files:[{"name": "RG.pdf"}],
      },
      update: { 
      }
    },
    // 7
    {
      where: { id: visitsId[7] },
      create: {
        id: visitsId[7],
        visitorId: visitorsDefaults.ayrtonSenna,
        companyId: companysDefaults.tesla,
        approved: true,
        description: 'Reunião',
        scheduledDate: new Date(2024, 6, 21, 8, 30),
        files:[{"name": "RG.pdf"}],
      },
      update: { 
      }
    },

    // RECUSADO

    // 8
    {
      where: { id: visitsId[8] },
      create: {
        id: visitsId[8],
        visitorId: visitorsDefaults.gabrielFAM,
        companyId: companysDefaults.tesla,
        approved: false,
        description: 'Reunião com o Elon Musk',
        scheduledDate: new Date(2024, 6, 21, 5, 45),
        files:[{"name": "Documentacao.pdf"}, {"name": "RG.pdf"}],
      },
      update: { 
      }
    },
    // 9
    {
      where: { id: visitsId[9] },
      create: {
        id: visitsId[9],
        visitorId: visitorsDefaults.billGates,
        companyId: companysDefaults.tesla,
        approved: false,
        description: 'Parceira',
        scheduledDate: new Date(2024, 6, 21, 6, 30),
        files:[{"name": "RG.pdf"}],
      },
      update: { 
      }
    },

    // FINALIZADO

    // 10
    {
      where: { id: visitsId[10] },
      create: {
        id: visitsId[10],
        visitorId: visitorsDefaults.billGates,
        companyId: companysDefaults.tesla,
        approved: true,
        finished: true,
        description: 'Reunião sócios',
        scheduledDate: new Date(2024, 6, 21, 5, 20),
        files:[{"name": "RG.pdf"}],
      },
      update: { 
      }
    },
  ]


  await Promise.all(visits.map(({ where, create, update }) => prisma.visit.upsert({ create, update, where }) ))
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