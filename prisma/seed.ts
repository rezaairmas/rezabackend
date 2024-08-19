import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Buat Roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: { name: 'ADMIN' },
    }),
    prisma.role.upsert({
      where: { name: 'USER' },
      update: {},
      create: { name: 'USER' },
    }),
    prisma.role.upsert({
      where: { name: 'MANAGER' },
      update: {},
      create: { name: 'MANAGER' },
    }),
    prisma.role.upsert({
      where: { name: 'VIEWER' },
      update: {},
      create: { name: 'VIEWER' },
    }),
    prisma.role.upsert({
      where: { name: 'SUPERADMIN' },
      update: {},
      create: { name: 'SUPERADMIN' },
    }),
    prisma.role.upsert({
      where: { name: 'GUEST' },
      update: {},
      create: { name: 'GUEST' },
    }),
    prisma.role.upsert({
      where: { name: 'EDITOR' },
      update: {},
      create: { name: 'EDITOR' },
    }),
  ]);

  // Buat Permissions
  const permissions = await Promise.all([
    prisma.permission.upsert({
      where: { name: 'READ' },
      update: {},
      create: { name: 'READ' },
    }),
    prisma.permission.upsert({
      where: { name: 'WRITE' },
      update: {},
      create: { name: 'WRITE' },
    }),
    prisma.permission.upsert({
      where: { name: 'UPDATE' },
      update: {},
      create: { name: 'UPDATE' },
    }),
    prisma.permission.upsert({
      where: { name: 'DELETE' },
      update: {},
      create: { name: 'DELETE' },
    }),
    prisma.permission.upsert({
      where: { name: 'EXECUTE' },
      update: {},
      create: { name: 'EXECUTE' },
    }),
    prisma.permission.upsert({
      where: { name: 'MANAGE' },
      update: {},
      create: { name: 'MANAGE' },
    }),
  ]);

  // Buat Branch
  const branch = await prisma.branch.upsert({
    where: { name: 'Main Branch' },
    update: {},
    create: { name: 'Main Branch' },
  });

  // Buat UserOffice
  const userOffice = await prisma.userOffice.create({
    data: {
      email: 'useroffice@example.com',
      password: 'password',
      name: 'User Office',
      branchId: branch.id,
    },
  });

  // Hubungkan UserOffice dengan Role
  await prisma.role_UserOffice.create({
    data: {
      userOfficeId: userOffice.id,
      roleId: roles.find(role => role.name === 'ADMIN')!.id,
    },
  });

  // Hubungkan UserOffice dengan Permission
  await prisma.permissions_UserOffice.create({
    data: {
      userOfficeId: userOffice.id,
      permissionId: permissions.find(permission => permission.name === 'READ')!.id,
    },
  });

  // Buat UserMerchantAdmin
  const userMerchantAdmin = await prisma.userMerchantAdmin.create({
    data: {
      email: 'merchantadmin@example.com',
      password: 'password',
      name: 'Merchant Admin',
    },
  });

  // Hubungkan UserMerchantAdmin dengan Role
  await prisma.role_UserMerchantAdmin.create({
    data: {
      userMerchantAdminId: userMerchantAdmin.id,
      roleId: roles.find(role => role.name === 'USER')!.id,
    },
  });

  // Hubungkan UserMerchantAdmin dengan Permission
  await prisma.permissions_UserMerchantAdmin.create({
    data: {
      userMerchantAdminId: userMerchantAdmin.id,
      permissionId: permissions.find(permission => permission.name === 'WRITE')!.id,
    },
  });

  // Buat UserMerchant
  const userMerchant = await prisma.userMerchant.create({
    data: {
      email: 'merchant@example.com',
      password: 'password',
      name: 'Merchant',
    },
  });

  // Hubungkan UserMerchant dengan Role
  await prisma.role_UserMerchant.create({
    data: {
      userMerchantId: userMerchant.id,
      roleId: roles.find(role => role.name === 'MANAGER')!.id,
    },
  });

  // Hubungkan UserMerchant dengan Permission
  await prisma.permissions_UserMerchant.create({
    data: {
      userMerchantId: userMerchant.id,
      permissionId: permissions.find(permission => permission.name === 'UPDATE')!.id,
    },
  });

  // Buat UserCustomer
  const userCustomer = await prisma.userCustomer.create({
    data: {
      email: 'customer@example.com',
      password: 'password',
      name: 'Customer',
    },
  });

  // Hubungkan UserCustomer dengan Role
  await prisma.role_UserCustomer.create({
    data: {
      userCustomerId: userCustomer.id,
      roleId: roles.find(role => role.name === 'VIEWER')!.id,
    },
  });

  // Hubungkan UserCustomer dengan Permission
  await prisma.permissions_UserCustomer.create({
    data: {
      userCustomerId: userCustomer.id,
      permissionId: permissions.find(permission => permission.name === 'READ')!.id,
    },
  });

  console.log('Data dummy berhasil dibuat!');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
