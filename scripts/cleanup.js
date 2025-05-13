const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Danh sách các package không cần thiết
const unnecessaryPackages = [
  '@tailwindcss/typography',
  'bcryptjs',
  // Thêm các package khác vào đây nếu cần
];

// Xóa các package không cần thiết
console.log('Removing unnecessary packages...');
unnecessaryPackages.forEach(pkg => {
  try {
    execSync(`npm uninstall ${pkg}`, { stdio: 'inherit' });
    console.log(`Removed package: ${pkg}`);
  } catch (error) {
    console.log(`Failed to remove package ${pkg}:`, error.message);
  }
});

// Xóa các thư mục trùng lặp
const duplicateDirs = [
  'FE/FE',
  'FE/BE',
  'BE/FE',
  'BE/BE'
];

duplicateDirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Removed duplicate directory: ${dir}`);
  }
});

// Di chuyển các file từ FE/src vào src
const feSrcPath = path.join(__dirname, '..', 'FE', 'src');
const srcPath = path.join(__dirname, '..', 'src');

if (fs.existsSync(feSrcPath)) {
  const files = fs.readdirSync(feSrcPath);
  files.forEach(file => {
    const sourcePath = path.join(feSrcPath, file);
    const targetPath = path.join(srcPath, file);
    
    if (fs.existsSync(targetPath)) {
      fs.rmSync(targetPath, { recursive: true, force: true });
    }
    
    fs.renameSync(sourcePath, targetPath);
    console.log(`Moved ${file} from FE/src to src`);
  });
}

// Xóa thư mục FE/src sau khi di chuyển
if (fs.existsSync(feSrcPath)) {
  fs.rmSync(feSrcPath, { recursive: true, force: true });
  console.log('Removed FE/src directory');
}

// Di chuyển các file cấu hình từ FE vào thư mục gốc
const configFiles = [
  'next-env.d.ts',
  'postcss.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  'package.json',
  'package-lock.json'
];

configFiles.forEach(file => {
  const sourcePath = path.join(__dirname, '..', 'FE', file);
  const targetPath = path.join(__dirname, '..', file);
  
  if (fs.existsSync(sourcePath)) {
    if (fs.existsSync(targetPath)) {
      fs.rmSync(targetPath);
    }
    fs.renameSync(sourcePath, targetPath);
    console.log(`Moved ${file} from FE to root`);
  }
});

// Xóa thư mục FE sau khi di chuyển
const fePath = path.join(__dirname, '..', 'FE');
if (fs.existsSync(fePath)) {
  fs.rmSync(fePath, { recursive: true, force: true });
  console.log('Removed FE directory');
}

// Xóa các file không cần thiết
const unnecessaryFiles = [
  'src/app/globals.css',
  // Thêm các file khác vào đây nếu cần
];

unnecessaryFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
    console.log(`Removed unnecessary file: ${file}`);
  }
});

console.log('Cleanup completed successfully!'); 