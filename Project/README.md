一、运行环境要求
- Node.js 18 或更高版本 Node.js 22 LTS。
- pnpm。

二、运行方式
在终端中进入可运行项目目录：

```powershell
cd Project
```

若未安装pnpm包，可输入以下指令进行安装

```powershell
pnpm install
```

安装完成后，输入以下指令以检查 TypeScript 并生成生产构建：

```powershell
pnpm run build
```

输入以下指令以启动分析系统

```powershell
pnpm run dev
```

根据终端输出打开本地地址，通常是 `http://localhost:5173/`。

三、数据导入方式
1. 按照 `types.ts` 中的 `CountryYearRecord` 结构预处理所得数据。
2. 保持 `country + year` 唯一；统一单位，避免同一字段混用 m³、百万 m³ 和 km³。
3. 将真实数据按照对应格式导入 `mockData.ts` 