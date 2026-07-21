// mockData.ts  —  按国家名称首字母排序，名称已对齐世界地图
import type { CountryYearRecord, Region } from './types'

interface CountryBase {
  country: string
  iso3: string
  region: Region
  population: number
  resources: number
  withdrawal: number
  stress: number
  agricultureShare: number
  industryShare: number
  efficiency: number
  irrigatedArea: number
}

const countryBases: CountryBase[] = [
  { country: 'Afghanistan', iso3: 'AFG', region: 'Asia', population: 40.0004, resources: 65.33, withdrawal: 20.282, stress: 54.757019438, agricultureShare: 0.9817, industryShare: 0.0083, efficiency: 0.641496614, irrigatedArea: 3.208 },
  { country: 'Albania', iso3: 'ALB', region: 'Europe', population: 2.8496, resources: 30.2, withdrawal: 0.796, stress: 4.783653846, agricultureShare: 0.7085, industryShare: 0.0126, efficiency: 13.033848199, irrigatedArea: 0.3612 },
  { country: 'Algeria', iso3: 'DZA', region: 'Africa', population: 44.7611, resources: 11.667, withdrawal: 9.992, stress: 140.59378078, agricultureShare: 0.6715, industryShare: 0.0194, efficiency: 16.478306652, irrigatedArea: 1.365 },
  { country: 'Angola', iso3: 'AGO', region: 'Africa', population: 34.5324, resources: 148.4, withdrawal: 0.7057, stress: 1.871883289, agricultureShare: 0.2078, industryShare: 0.3395, efficiency: 133.881777508, irrigatedArea: 0.0855 },
  { country: 'Antigua and Barbuda', iso3: 'ATG', region: 'North America', population: 0.0923, resources: 0.052, withdrawal: 0.00164, stress: 3.153846154, agricultureShare: 0.1565, industryShare: 0.2174, efficiency: 115.093827769, irrigatedArea: 0.0004 },
  { country: 'Argentina', iso3: 'ARG', region: 'South America', population: 45.3123, resources: 876.24, withdrawal: 37.69, stress: 10.456664077, agricultureShare: 0.7393, industryShare: 0.1059, efficiency: 12.522882992, irrigatedArea: 1.0958 },
  { country: 'Armenia', iso3: 'ARM', region: 'Asia', population: 2.8703, resources: 7.769, withdrawal: 2.967, stress: 59.854750857, agricultureShare: 0.7604, industryShare: 0.0371, efficiency: 3.516470904, irrigatedArea: 0.1558 },
  { country: 'Australia', iso3: 'AUS', region: 'Oceania', population: 25.9564, resources: 492.0, withdrawal: 11.06, stress: 4.44712505, agricultureShare: 0.6618, industryShare: 0.1941, efficiency: 79.173453766, irrigatedArea: 1.9449 },
  { country: 'Austria', iso3: 'AUT', region: 'Europe', population: 8.9671, resources: 77.7, withdrawal: 3.14, stress: 8.676429953, agricultureShare: 0.0395, industryShare: 0.7038, efficiency: 113.842434714, irrigatedArea: 0.0998 },
  { country: 'Azerbaijan', iso3: 'AZE', region: 'Asia', population: 10.2344, resources: 34.675, withdrawal: 12.96786, stress: 57.265886509, agricultureShare: 0.9224, industryShare: 0.0461, efficiency: 3.756496182, irrigatedArea: 1.4849 },
  { country: 'Bahrain', iso3: 'BHR', region: 'Asia', population: 1.5018, resources: 0.116, withdrawal: 0.1769, stress: 152.5, agricultureShare: 0.3331, industryShare: 0.0325, efficiency: 76.463967674, irrigatedArea: 0.0037 },
  { country: 'Bangladesh', iso3: 'BGD', region: 'Asia', population: 167.6589, resources: 1227.032, withdrawal: 35.87, stress: 5.723339482, agricultureShare: 0.8782, industryShare: 0.0215, efficiency: 8.896925394, irrigatedArea: 5.05 },
  { country: 'Barbados', iso3: 'BRB', region: 'North America', population: 0.2821, resources: 0.08, withdrawal: 0.07, stress: 87.5, agricultureShare: 0.6765, industryShare: 0.0765, efficiency: 49.340892371, irrigatedArea: 0.0054 },
  { country: 'Belarus', iso3: 'BLR', region: 'Europe', population: 9.2514, resources: 57.9, withdrawal: 1.425, stress: 4.696769941, agricultureShare: 0.2779, industryShare: 0.3018, efficiency: 34.12574398, irrigatedArea: 0.0287 },
  { country: 'Belgium', iso3: 'BEL', region: 'Europe', population: 11.5708, resources: 18.3, withdrawal: 4.300015419, stress: 52.825742252, agricultureShare: 0.0099, industryShare: 0.9731, efficiency: 104.232029913, irrigatedArea: 0.0241 },
  { country: 'Belize', iso3: 'BLZ', region: 'North America', population: 0.3953, resources: 21.734, withdrawal: 0.0098764, stress: 0.123239331, agricultureShare: 0.6772, industryShare: 0.2099, efficiency: 18.012332149, irrigatedArea: 0.0035 },
  { country: 'Benin', iso3: 'BEN', region: 'Africa', population: 13.4134, resources: 26.39, withdrawal: 0.13, stress: 0.975243811, agricultureShare: 0.2521, industryShare: 0.1282, efficiency: 42.237871393, irrigatedArea: 0.0243 },
  { country: 'Bhutan', iso3: 'BTN', region: 'Asia', population: 0.7754, resources: 78.0, withdrawal: 0.3379, stress: 1.413807531, agricultureShare: 0.9408, industryShare: 0.0089, efficiency: 6.371672199, irrigatedArea: 0.0277 },
  { country: 'Bolivia', iso3: 'BOL', region: 'South America', population: 11.9374, resources: 574.0, withdrawal: 0.360085791, stress: 0.202979589, agricultureShare: 0.8708, industryShare: 0.0145, efficiency: 13.285263834, irrigatedArea: 0.5416 },
  { country: 'Botswana', iso3: 'BWA', region: 'Africa', population: 2.4014, resources: 12.24, withdrawal: 0.2336215, stress: 2.442972916, agricultureShare: 0.3339, industryShare: 0.1179, efficiency: 66.151146788, irrigatedArea: 0.0034 },
  { country: 'Bosnia and Herz.', iso3: 'BIH', region: 'Europe', population: 3.2, resources: 37.5, withdrawal: 0.8, stress: 2.133333333, agricultureShare: 0.2, industryShare: 0.3, efficiency: 20.0, irrigatedArea: 0.015 },
  { country: 'Brazil', iso3: 'BRA', region: 'South America', population: 209.5503, resources: 8647.0, withdrawal: 67.31, stress: 1.481946279, agricultureShare: 0.6131, industryShare: 0.1453, efficiency: 22.036755303, irrigatedArea: 5.624 },
  { country: 'Bulgaria', iso3: 'BGR', region: 'Europe', population: 6.8772, resources: 21.3, withdrawal: 5.215, stress: 38.546825338, agricultureShare: 0.1413, industryShare: 0.6988, efficiency: 9.539325465, irrigatedArea: 0.1359 },
  { country: 'Burkina Faso', iso3: 'BFA', region: 'Africa', population: 21.9952, resources: 13.5, withdrawal: 0.133519472, stress: 1.276476788, agricultureShare: 0.5143, industryShare: 0.0265, efficiency: 14.837372463, irrigatedArea: 0.0543 },
  { country: 'Burundi', iso3: 'BDI', region: 'Africa', population: 12.9655, resources: 12.536, withdrawal: 0.274066037, stress: 9.973291012, agricultureShare: 0.81, industryShare: 0.0547, efficiency: 7.111709031, irrigatedArea: 0.0744 },
  { country: 'Cambodia', iso3: 'KHM', region: 'Asia', population: 16.9743, resources: 476.1, withdrawal: 2.184, stress: 1.03654485, agricultureShare: 0.94, industryShare: 0.0151, efficiency: 12.098572138, irrigatedArea: 0.2695 },
  { country: 'Cameroon', iso3: 'CMR', region: 'Africa', population: 26.9158, resources: 283.15, withdrawal: 1.0884, stress: 1.560430107, agricultureShare: 0.6771, industryShare: 0.0961, efficiency: 26.972829321, irrigatedArea: 0.0257 },
  { country: 'Canada', iso3: 'CAN', region: 'North America', population: 38.4541, resources: 2902.0, withdrawal: 36.128, stress: 3.720700309, agricultureShare: 0.1068, industryShare: 0.7572, efficiency: 43.108160452, irrigatedArea: 1.218 },
  { country: 'Cape Verde', iso3: 'CPV', region: 'Africa', population: 0.5166, resources: 0.3, withdrawal: 0.17153252, stress: 57.177506667, agricultureShare: 0.4253, industryShare: 0.022, efficiency: 5.699545221, irrigatedArea: 0.0038 },
  { country: 'Central African Rep.', iso3: 'CAF', region: 'Africa', population: 5.1121, resources: 141.0, withdrawal: 0.0725, stress: 0.335648148, agricultureShare: 0.0055, industryShare: 0.1655, efficiency: 17.886773086, irrigatedArea: 0.0001 },
  { country: 'Chad', iso3: 'TCD', region: 'Africa', population: 17.8283, resources: 45.7, withdrawal: 0.8796, stress: 4.294921875, agricultureShare: 0.7642, industryShare: 0.1179, efficiency: 11.421605789, irrigatedArea: 0.0303 },
  { country: 'Chile', iso3: 'CHL', region: 'South America', population: 19.4563, resources: 923.06, withdrawal: 35.368, stress: 8.982121089, agricultureShare: 0.9089, industryShare: 0.0513, efficiency: 7.442418321, irrigatedArea: 1.1086 },
  { country: 'China', iso3: 'CHN', region: 'Asia', population: 1426.4373, resources: 2840.22, withdrawal: 578.19, stress: 42.227691679, agricultureShare: 0.6156, industryShare: 0.174, efficiency: 26.06294438, irrigatedArea: 75.687 },
  { country: 'Colombia', iso3: 'COL', region: 'South America', population: 51.1882, resources: 2360.0, withdrawal: 23.61663, stress: 3.535423653, agricultureShare: 0.8423, industryShare: 0.0169, efficiency: 11.685562804, irrigatedArea: 0.3118 },
  { country: 'Comoros', iso3: 'COM', region: 'Africa', population: 0.8182, resources: 1.2, withdrawal: 0.01, stress: 0.833333333, agricultureShare: 0.47, industryShare: 0.05, efficiency: 73.51018458, irrigatedArea: 0.0001 },
  { country: 'Congo', iso3: 'COG', region: 'Africa', population: 5.8922, resources: 832.0, withdrawal: 0.046, stress: 0.027446301, agricultureShare: 0.0436, industryShare: 0.2617, efficiency: 103.644889314, irrigatedArea: 0.002 },
  { country: 'Costa Rica', iso3: 'CRI', region: 'North America', population: 5.06, resources: 113.0, withdrawal: 3.44683, stress: 5.881962457, agricultureShare: 0.6072, industryShare: 0.0712, efficiency: 17.196139594, irrigatedArea: 0.1596 },
  { country: 'Côte d\'Ivoire', iso3: 'CIV', region: 'Africa', population: 29.6397, resources: 84.14, withdrawal: 1.162, stress: 5.087565674, agricultureShare: 0.5164, industryShare: 0.2083, efficiency: 41.834379617, irrigatedArea: 0.0727 },
  { country: 'Croatia', iso3: 'HRV', region: 'Europe', population: 3.9246, resources: 105.5, withdrawal: 0.665, stress: 1.47843486, agricultureShare: 0.0758, industryShare: 0.485, efficiency: 46.478297898, irrigatedArea: 0.0291 },
  { country: 'Cuba', iso3: 'CUB', region: 'North America', population: 11.1222, resources: 38.12, withdrawal: 6.444, stress: 22.170996043, agricultureShare: 0.6494, industryShare: 0.1063, efficiency: 12.542198927, irrigatedArea: 0.6391 },
  { country: 'Cyprus', iso3: 'CYP', region: 'Asia', population: 1.3173, resources: 0.78, withdrawal: 0.235, stress: 32.121377802, agricultureShare: 0.6228, industryShare: 0.0588, efficiency: 82.659304149, irrigatedArea: 0.0342 },
  { country: 'Czech Rep.', iso3: 'CZE', region: 'Europe', population: 10.5307, resources: 13.15, withdrawal: 1.348, stress: 20.498783455, agricultureShare: 0.0274, industryShare: 0.5289, efficiency: 141.971004583, irrigatedArea: 0.0386 },
  { country: 'Dem. Rep. Congo', iso3: 'COD', region: 'Africa', population: 99.1489, resources: 1283.0, withdrawal: 0.6836, stress: 0.226883505, agricultureShare: 0.1052, industryShare: 0.2147, efficiency: 54.586873213, irrigatedArea: 0.0105 },
  { country: 'Denmark', iso3: 'DNK', region: 'Europe', population: 5.8568, resources: 6.0, withdrawal: 0.96471, stress: 26.08734451, agricultureShare: 0.536, industryShare: 0.0543, efficiency: 313.516048592, irrigatedArea: 0.301 },
  { country: 'Djibouti', iso3: 'DJI', region: 'Africa', population: 1.0, resources: 0.3, withdrawal: 0.05, stress: 16.7, agricultureShare: 0.2, industryShare: 0.1, efficiency: 2.0, irrigatedArea: 0.002,},
  { country: 'Dominican Rep.', iso3: 'DOM', region: 'North America', population: 11.1235, resources: 23.5, withdrawal: 7.137, stress: 39.553314121, agricultureShare: 0.8331, industryShare: 0.0727, efficiency: 9.162519938, irrigatedArea: 0.3101 },
  { country: 'Ecuador', iso3: 'ECU', region: 'South America', population: 17.6825, resources: 442.4, withdrawal: 1.814240757, stress: 1.24093075, agricultureShare: 0.8143, industryShare: 0.0554, efficiency: 9.400965518, irrigatedArea: 1.71 },
  { country: 'Egypt', iso3: 'EGY', region: 'Africa', population: 110.957, resources: 57.5, withdrawal: 62.0, stress: 112.932604736, agricultureShare: 0.7916, industryShare: 0.0697, efficiency: 5.039478052, irrigatedArea: 3.823 },
  { country: 'El Salvador', iso3: 'SLV', region: 'North America', population: 6.2558, resources: 26.27, withdrawal: 1.949080188, stress: 12.158953139, agricultureShare: 0.4994, industryShare: 0.0976, efficiency: 21.628981357, irrigatedArea: 0.0323 },
  { country: 'Eq. Guinea', iso3: 'GNQ', region: 'Africa', population: 1.5, resources: 26.0, withdrawal: 0.2, stress: 0.8, agricultureShare: 0.3, industryShare: 0.2, efficiency: 5.0, irrigatedArea: 0.0,},
  { country: 'Eritrea', iso3: 'ERI', region: 'Africa', population: 3.3502, resources: 7.315, withdrawal: 0.582, stress: 11.175115207, agricultureShare: 0.945, industryShare: 0.0017, efficiency: 3.411395095, irrigatedArea: 0.0216 },
  { country: 'Estonia', iso3: 'EST', region: 'Europe', population: 1.3317, resources: 12.806, withdrawal: 0.999749643, stress: 10.819801331, agricultureShare: 0.005, industryShare: 0.9229, efficiency: 24.325491032, irrigatedArea: 0.0027 },
  { country: 'Eswatini', iso3: 'SWZ', region: 'Africa', population: 1.2066, resources: 4.51, withdrawal: 1.068, stress: 77.559912854, agricultureShare: 0.9419, industryShare: 0.0194, efficiency: 3.926780358, irrigatedArea: 0.0499 },
  { country: 'Ethiopia', iso3: 'ETH', region: 'Africa', population: 122.1386, resources: 122.0, withdrawal: 10.5481, stress: 32.257186544, agricultureShare: 0.9184, industryShare: 0.0048, efficiency: 5.518324932, irrigatedArea: 0.8582 },
  { country: 'Falkland Is.', iso3: 'FLK', region: 'South America', population: 0.0038,resources: 1.2, withdrawal: 0.001, stress: 0.0833, agricultureShare: 0.5, industryShare: 0.0, efficiency: 50.0, irrigatedArea: 0.0,},
  { country: 'Fiji', iso3: 'FJI', region: 'Oceania', population: 0.9167, resources: 28.55, withdrawal: 0.15974, stress: 0.559509632, agricultureShare: 0.5889, industryShare: 0.1131, efficiency: 34.193196062, irrigatedArea: 0.004 },
  { country: 'Finland', iso3: 'FIN', region: 'Europe', population: 5.5411, resources: 110.0, withdrawal: 3.0, stress: 7.114062129, agricultureShare: 0.3431, industryShare: 0.4853, efficiency: 73.522008358, irrigatedArea: 0.0712 },
  { country: 'France', iso3: 'FRA', region: 'Europe', population: 66.0835, resources: 211.0, withdrawal: 24.852984, stress: 21.756967522, agricultureShare: 0.1046, industryShare: 0.6703, efficiency: 90.311472508, irrigatedArea: 2.8297 },
  { country: 'Gabon', iso3: 'GAB', region: 'Africa', population: 2.3767, resources: 166.0, withdrawal: 0.1391, stress: 0.502166065, agricultureShare: 0.2897, industryShare: 0.1014, efficiency: 100.441916147, irrigatedArea: 0.0044 },
  { country: 'Gambia', iso3: 'GMB', region: 'Africa', population: 2.576, resources: 8.0, withdrawal: 0.1016, stress: 2.209656372, agricultureShare: 0.3858, industryShare: 0.2087, efficiency: 12.170988486, irrigatedArea: 0.0021 },
  { country: 'Georgia', iso3: 'GEO', region: 'Asia', population: 3.7885, resources: 63.33, withdrawal: 1.60898, stress: 5.240977199, agricultureShare: 0.4661, industryShare: 0.2019, efficiency: 9.7067974, irrigatedArea: 0.1382 },
  { country: 'Germany', iso3: 'DEU', region: 'Europe', population: 83.6971, resources: 154.0, withdrawal: 23.97424, stress: 32.859429825, agricultureShare: 0.0334, industryShare: 0.5603, efficiency: 135.208516631, irrigatedArea: 0.6782 },
  { country: 'Ghana', iso3: 'GHA', region: 'Africa', population: 32.5187, resources: 56.2, withdrawal: 0.09066, stress: 0.395204882, agricultureShare: 0.7306, industryShare: 0.0649, efficiency: 33.233071889, irrigatedArea: 0.0309 },
  { country: 'Greece', iso3: 'GRC', region: 'Europe', population: 10.5796, resources: 68.4, withdrawal: 10.087, stress: 20.406635646, agricultureShare: 0.8037, industryShare: 0.029, efficiency: 17.275406405, irrigatedArea: 1.5169 },
  { country: 'Greenland', iso3: 'GRL', region: 'Europe', population: 0.056, resources: 500.0, withdrawal: 0.05, stress: 0.01, agricultureShare: 0.1, industryShare: 0.2, efficiency: 5.0, irrigatedArea: 0.0,},
  { country: 'Guatemala', iso3: 'GTM', region: 'North America', population: 17.5987, resources: 127.91, withdrawal: 3.3241, stress: 5.742097081, agricultureShare: 0.5674, industryShare: 0.1814, efficiency: 19.540170343, irrigatedArea: 0.3375 },
  { country: 'Guinea', iso3: 'GIN', region: 'Africa', population: 13.7105, resources: 226.0, withdrawal: 0.89, stress: 1.369230769, agricultureShare: 0.6742, industryShare: 0.0674, efficiency: 10.046791243, irrigatedArea: 0.0949 },
  { country: 'Guinea-Bissau', iso3: 'GNB', region: 'Africa', population: 2.0588, resources: 31.4, withdrawal: 0.175, stress: 1.495726496, agricultureShare: 0.7579, industryShare: 0.0626, efficiency: 3.739322439, irrigatedArea: 0.0226 },
  { country: 'Guyana', iso3: 'GUY', region: 'South America', population: 0.8155, resources: 271.0, withdrawal: 0.135, stress: 0.308219178, agricultureShare: 0.9434, industryShare: 0.0141, efficiency: 4.949086581, irrigatedArea: 0.143 },
  { country: 'Haiti', iso3: 'HTI', region: 'North America', population: 11.3746, resources: 14.022, withdrawal: 1.45, stress: 13.383791767, agricultureShare: 0.8338, industryShare: 0.0352, efficiency: 7.674801879, irrigatedArea: 0.0915 },
  { country: 'Honduras', iso3: 'HND', region: 'North America', population: 10.2899, resources: 92.164, withdrawal: 1.607, stress: 4.621268764, agricultureShare: 0.733, industryShare: 0.0709, efficiency: 13.180040122, irrigatedArea: 0.0732 },
  { country: 'Hungary', iso3: 'HUN', region: 'Europe', population: 9.7078, resources: 104.0, withdrawal: 4.4689, stress: 7.718307427, agricultureShare: 0.1143, industryShare: 0.7446, efficiency: 27.339309694, irrigatedArea: 0.2352 },
  { country: 'Iceland', iso3: 'ISL', region: 'Europe', population: 0.3726, resources: 170.0, withdrawal: 0.29, stress: 0.394075282, agricultureShare: 0.001, industryShare: 0.7115, efficiency: 61.60922904, irrigatedArea: 0 },
  { country: 'India', iso3: 'IND', region: 'Asia', population: 1414.2039, resources: 1910.9, withdrawal: 641.43, stress: 65.868761553, agricultureShare: 0.9041, industryShare: 0.0223, efficiency: 3.317589271, irrigatedArea: 81.6489 },
  { country: 'Indonesia', iso3: 'IDN', region: 'Asia', population: 276.7581, resources: 2018.7, withdrawal: 222.635, stress: 29.696545285, agricultureShare: 0.8521, industryShare: 0.041, efficiency: 4.269007113, irrigatedArea: 6.722 },
  { country: 'Iran', iso3: 'IRN', region: 'Asia', population: 88.4555, resources: 137.045, withdrawal: 91.966, stress: 80.428527701, agricultureShare: 0.9218, industryShare: 0.0118, efficiency: 4.703283857, irrigatedArea: 8.7 },
  { country: 'Iraq', iso3: 'IRQ', region: 'Asia', population: 43.0712, resources: 89.86, withdrawal: 57.305, stress: 80.484550562, agricultureShare: 0.7831, industryShare: 0.0802, efficiency: 3.125902024, irrigatedArea: 1.8327 },
  { country: 'Ireland', iso3: 'IRL', region: 'Europe', population: 5.0284, resources: 52.0, withdrawal: 1.581, stress: 7.60827719, agricultureShare: 0.0253, industryShare: 0.334, efficiency: 280.267958381, irrigatedArea: 0.0 },
  { country: 'Israel', iso3: 'ISR', region: 'Asia', population: 8.9429, resources: 1.78, withdrawal: 1.53, stress: 131.998964714, agricultureShare: 0.4908, industryShare: 0.04, efficiency: 132.21390077, irrigatedArea: 0.225 },
  { country: 'Italy', iso3: 'ITA', region: 'Europe', population: 59.7293, resources: 191.3, withdrawal: 33.75112, stress: 29.739289805, agricultureShare: 0.5027, industryShare: 0.2277, efficiency: 49.767205189, irrigatedArea: 4.249 },
  { country: 'Jamaica', iso3: 'JAM', region: 'North America', population: 2.8377, resources: 10.823, withdrawal: 1.340192487, stress: 12.382818879, agricultureShare: 0.1706, industryShare: 0.095, efficiency: 24.634861567, irrigatedArea: 0.0459 },
  { country: 'Japan', iso3: 'JPN', region: 'Asia', population: 125.6793, resources: 430.0, withdrawal: 78.6, stress: 36.137931034, agricultureShare: 0.6743, industryShare: 0.1272, efficiency: 56.602138933, irrigatedArea: 2.8934 },
  { country: 'Jordan', iso3: 'JOR', region: 'Asia', population: 11.0664, resources: 0.937, withdrawal: 0.92562, stress: 102.51633625, agricultureShare: 0.5165, industryShare: 0.0334, efficiency: 33.439820042, irrigatedArea: 0.0896 },
  { country: 'Kazakhstan', iso3: 'KAZ', region: 'Asia', population: 19.7436, resources: 108.41, withdrawal: 24.356, stress: 33.780859917, agricultureShare: 0.5998, industryShare: 0.2433, efficiency: 8.050031466, irrigatedArea: 1.5576 },
  { country: 'Kenya', iso3: 'KEN', region: 'Africa', population: 53.2192, resources: 30.7, withdrawal: 1.20783, stress: 9.957378401, agricultureShare: 0.8229, industryShare: 0.022, efficiency: 16.373304812, irrigatedArea: 0.2004 },
  { country: 'Kuwait', iso3: 'KWT', region: 'Asia', population: 4.3607, resources: 0.02, withdrawal: 0.7701, stress: 3850.5, agricultureShare: 0.6227, industryShare: 0.0186, efficiency: 103.215734387, irrigatedArea: 0.017 },
  { country: 'Kyrgyzstan', iso3: 'KGZ', region: 'Asia', population: 6.8205, resources: 23.618, withdrawal: 7.6578, stress: 49.719516946, agricultureShare: 0.9269, industryShare: 0.0439, efficiency: 0.912678691, irrigatedArea: 1.0214 },
  { country: 'Lao PDR', iso3: 'LAO', region: 'Asia', population: 7.4532, resources: 333.5, withdrawal: 7.35, stress: 4.791395046, agricultureShare: 0.9592, industryShare: 0.0231, efficiency: 2.086426499, irrigatedArea: 0.441 },
  { country: 'Latvia', iso3: 'LVA', region: 'Europe', population: 1.8856, resources: 34.94, withdrawal: 0.184450151, stress: 1.086918981, agricultureShare: 0.2874, industryShare: 0.2194, efficiency: 135.817149966, irrigatedArea: 0.0012 },
  { country: 'Lebanon', iso3: 'LBN', region: 'Asia', population: 5.7181, resources: 4.503, withdrawal: 1.812, stress: 58.792991564, agricultureShare: 0.3804, industryShare: 0.4891, efficiency: 20.848206388, irrigatedArea: 0.09 },
  { country: 'Lesotho', iso3: 'LSO', region: 'Africa', population: 2.2615, resources: 3.022, withdrawal: 0.0438, stress: 2.565905097, agricultureShare: 0.0868, industryShare: 0.4566, efficiency: 40.383702722, irrigatedArea: 0.0026 },
  { country: 'Liberia', iso3: 'LBR', region: 'Africa', population: 5.2593, resources: 232.0, withdrawal: 0.1459, stress: 0.264311594, agricultureShare: 0.0843, industryShare: 0.366, efficiency: 17.123964675, irrigatedArea: 0.0021 },
  { country: 'Libya', iso3: 'LBY', region: 'Africa', population: 7.1352, resources: 0.7, withdrawal: 5.72, stress: 817.142857143, agricultureShare: 0.8319, industryShare: 0.048, efficiency: 7.057363463, irrigatedArea: 0.4 },
  { country: 'Lithuania', iso3: 'LTU', region: 'Europe', population: 2.7945, resources: 24.5, withdrawal: 0.35483, stress: 2.558255227, agricultureShare: 0.1667, industryShare: 0.4229, efficiency: 126.018494944, irrigatedArea: 0.0045 },
  { country: 'Luxembourg', iso3: 'LUX', region: 'Europe', population: 0.6403, resources: 3.5, withdrawal: 0.04603, stress: 3.816749585, agricultureShare: 0.0085, industryShare: 0.1256, efficiency: 1394.855683823, irrigatedArea: 0.0 },
  { country: 'Madagascar', iso3: 'MDG', region: 'Africa', population: 29.6911, resources: 337.0, withdrawal: 37.874, stress: 31.693723849, agricultureShare: 0.9938, industryShare: 0.0033, efficiency: 0.280555994, irrigatedArea: 0.586 },
  { country: 'Malawi', iso3: 'MWI', region: 'Africa', population: 20.0473, resources: 17.28, withdrawal: 0.317214462, stress: 4.09256176, agricultureShare: 0.8594, industryShare: 0.0352, efficiency: 5.790768818, irrigatedArea: 0.1457 },
  { country: 'Malaysia', iso3: 'MYS', region: 'Asia', population: 34.2824, resources: 580.0, withdrawal: 6.707, stress: 3.439487179, agricultureShare: 0.4565, industryShare: 0.299, efficiency: 58.625781728, irrigatedArea: 0.402 },
  { country: 'Mali', iso3: 'MLI', region: 'Africa', population: 22.3886, resources: 120.0, withdrawal: 27.83, stress: 42.947530864, agricultureShare: 0.9786, industryShare: 0.0008, efficiency: 2.047425822, irrigatedArea: 0.3711 },
  { country: 'Malta', iso3: 'MLT', region: 'Europe', population: 0.5244, resources: 0.08139, withdrawal: 0.039623295, stress: 48.683247328, agricultureShare: 0.3681, industryShare: 0.0163, efficiency: 240.375621922, irrigatedArea: 0.0036 },
  { country: 'Mauritania', iso3: 'MRT', region: 'Africa', population: 4.7349, resources: 11.4, withdrawal: 1.3482, stress: 13.246217332, agricultureShare: 0.9058, industryShare: 0.0236, efficiency: 4.170049299, irrigatedArea: 0.045 },
  { country: 'Mauritius', iso3: 'MUS', region: 'Africa', population: 1.2796, resources: 2.751, withdrawal: 0.604, stress: 21.95565249, agricultureShare: 0.4975, industryShare: 0.0149, efficiency: 17.442467996, irrigatedArea: 0.0153 },
  { country: 'Mexico', iso3: 'MEX', region: 'North America', population: 127.6481, resources: 461.888, withdrawal: 89.944, stress: 45.015214606, agricultureShare: 0.7568, industryShare: 0.0955, efficiency: 12.652345222, irrigatedArea: 7.3031 },
  { country: 'Moldova', iso3: 'MDA', region: 'Europe', population: 3.0238, resources: 12.27, withdrawal: 0.836, stress: 12.414612415, agricultureShare: 0.0689, industryShare: 0.7306, efficiency: 9.248544629, irrigatedArea: 0.222 },
  { country: 'Mongolia', iso3: 'MNG', region: 'Asia', population: 3.3397, resources: 34.8, withdrawal: 0.5948, stress: 4.367107195, agricultureShare: 0.5426, industryShare: 0.3594, efficiency: 23.098917396, irrigatedArea: 0.0879 },
  { country: 'Montenegro', iso3: 'MNE', region: 'Europe', population: 0.62, resources: 8.5, withdrawal: 0.16, stress: 1.882352941, agricultureShare: 0.1, industryShare: 0.2, efficiency: 30.0, irrigatedArea: 0.002 },
  { country: 'Morocco', iso3: 'MAR', region: 'Africa', population: 36.9544, resources: 29.0, withdrawal: 7.696, stress: 36.941391062, agricultureShare: 0.8778, industryShare: 0.0203, efficiency: 9.670353864, irrigatedArea: 1.5202 },
  { country: 'Mozambique', iso3: 'MOZ', region: 'Africa', population: 31.7078, resources: 217.1, withdrawal: 1.473, stress: 1.751486326, agricultureShare: 0.7305, industryShare: 0.017, efficiency: 7.770668658, irrigatedArea: 0.1181 },
  { country: 'Myanmar', iso3: 'MMR', region: 'Asia', population: 53.3871, resources: 1167.8, withdrawal: 33.231, stress: 5.801501397, agricultureShare: 0.8856, industryShare: 0.0149, efficiency: 1.879610692, irrigatedArea: 2.11 },
  { country: 'Namibia', iso3: 'NAM', region: 'Africa', population: 2.8105, resources: 39.91, withdrawal: 0.102959477, stress: 0.314668328, agricultureShare: 0.558, industryShare: 0.1443, efficiency: 68.415696074, irrigatedArea: 0.0076 },
  { country: 'Nepal', iso3: 'NPL', region: 'Asia', population: 29.475, resources: 210.2, withdrawal: 9.4971, stress: 8.311832662, agricultureShare: 0.9814, industryShare: 0.0031, efficiency: 2.670987554, irrigatedArea: 1.134 },
  { country: 'Netherlands', iso3: 'NLD', region: 'Europe', population: 17.7306, resources: 91.0, withdrawal: 7.9462, stress: 16.075662553, agricultureShare: 0.0105, industryShare: 0.73, efficiency: 96.016276561, irrigatedArea: 0.5226 },
  { country: 'New Caledonia', iso3: 'NCL', region: 'Oceania', population: 0.285, resources: 50.0, withdrawal: 0.1, stress: 0.2, agricultureShare: 0.3, industryShare: 0.2, efficiency: 15.0, irrigatedArea: 0.01,},
  { country: 'New Zealand', iso3: 'NZL', region: 'Oceania', population: 5.1077, resources: 327.0, withdrawal: 9.875, stress: 8.04808476, agricultureShare: 0.6486, industryShare: 0.2395, efficiency: 40.38865344, irrigatedArea: 0.7448 },
  { country: 'Nicaragua', iso3: 'NIC', region: 'North America', population: 6.6447, resources: 164.52, withdrawal: 1.27302, stress: 2.220900209, agricultureShare: 0.8504, industryShare: 0.0005, efficiency: 8.336317789, irrigatedArea: 0.0916 },
  { country: 'Niger', iso3: 'NER', region: 'Africa', population: 24.5021, resources: 34.05, withdrawal: 2.5833078, stress: 11.020937713, agricultureShare: 0.9102, industryShare: 0.015, efficiency: 2.876035111, irrigatedArea: 0.1016 },
  { country: 'Nigeria', iso3: 'NGA', region: 'Africa', population: 218.5293, resources: 286.2, withdrawal: 38.33044, stress: 29.71351938, agricultureShare: 0.4417, industryShare: 0.1575, efficiency: 31.803436089, irrigatedArea: 0.3311 },
  { country: 'Dem. Rep. Korea', iso3: 'PRK', region: 'Asia', population: 26.2325, resources: 77.15, withdrawal: 8.6578, stress: 27.740467799, agricultureShare: 0.7635, industryShare: 0.1323, efficiency: 1.591332523, irrigatedArea: 1.46 },
  { country: 'Macedonia', iso3: 'MKD', region: 'Europe', population: 1.8511, resources: 6.4, withdrawal: 1.56739, stress: 37.932962246, agricultureShare: 0.0887, industryShare: 0.0085, efficiency: 5.769095465, irrigatedArea: 0.1278 },
  { country: 'Norway', iso3: 'NOR', region: 'Europe', population: 5.4081, resources: 393.0, withdrawal: 2.64249, stress: 2.009498099, agricultureShare: 0.3197, industryShare: 0.4051, efficiency: 140.923360403, irrigatedArea: 0.0889 },
  { country: 'Oman', iso3: 'OMN', region: 'Asia', population: 4.5004, resources: 1.4, withdrawal: 1.634, stress: 116.714285714, agricultureShare: 0.8078, industryShare: 0.1243, efficiency: 44.480196789, irrigatedArea: 0.1071 },
  { country: 'Pakistan', iso3: 'PAK', region: 'Asia', population: 239.4778, resources: 246.8, withdrawal: 184.16, stress: 112.974664131, agricultureShare: 0.9398, industryShare: 0.0076, efficiency: 1.830781116, irrigatedArea: 19.99 },
  { country: 'Palestine', iso3: 'PSE', region: 'Asia', population: 5.1853, resources: 0.837, withdrawal: 0.3736, stress: 53.287690772, agricultureShare: 0.3467, industryShare: 0.089, efficiency: 27.992308941, irrigatedArea: 0.0289 },
  { country: 'Panama', iso3: 'PAN', region: 'North America', population: 4.3454, resources: 139.304, withdrawal: 1.2114, stress: 0.90107111, agricultureShare: 0.3683, industryShare: 0.0051, efficiency: 49.549993249, irrigatedArea: 0.0321 },
  { country: 'Papua New Guinea', iso3: 'PNG', region: 'Oceania', population: 9.3217, resources: 801.0, withdrawal: 0.087, stress: 0.0109, agricultureShare: 0.677, industryShare: 0.057, efficiency: 12.0, irrigatedArea: 0.0,},
  { country: 'Paraguay', iso3: 'PRY', region: 'South America', population: 6.6842, resources: 387.77, withdrawal: 2.413, stress: 1.835399711, agricultureShare: 0.7862, industryShare: 0.0638, efficiency: 14.371622838, irrigatedArea: 0.1362 },
  { country: 'Peru', iso3: 'PER', region: 'South America', population: 33.1559, resources: 1879.8, withdrawal: 25.919, stress: 4.82842772, agricultureShare: 0.8145, industryShare: 0.0643, efficiency: 7.403322055, irrigatedArea: 2.5799 },
  { country: 'Philippines', iso3: 'PHL', region: 'Asia', population: 113.1009, resources: 479.0, withdrawal: 89.00036353, stress: 27.208915784, agricultureShare: 0.7623, industryShare: 0.1344, efficiency: 3.981172232, irrigatedArea: 2.0424 },
  { country: 'Poland', iso3: 'POL', region: 'Europe', population: 38.0403, resources: 60.5, withdrawal: 9.267, stress: 32.076843198, agricultureShare: 0.1387, industryShare: 0.6476, efficiency: 52.580975365, irrigatedArea: 0.6008 },
  { country: 'Portugal', iso3: 'PRT', region: 'Europe', population: 10.391, resources: 77.4, withdrawal: 6.12953, stress: 12.315712276, agricultureShare: 0.5543, industryShare: 0.2966, efficiency: 29.706969196, irrigatedArea: 0.5478 },
  { country: 'Puerto Rico', iso3: 'PRI', region: 'North America', population: 3.2532, resources: 7.1, withdrawal: 0.875, stress: 19.535610627, agricultureShare: 0.0347, industryShare: 0.7222, efficiency: 28.266239664, irrigatedArea: 0.022 },
  { country: 'Qatar', iso3: 'QAT', region: 'Asia', population: 2.815, resources: 0.058, withdrawal: 0.25, stress: 431.034482759, agricultureShare: 0.3625, industryShare: 0.0441, efficiency: 194.045439852, irrigatedArea: 0.0134 },
  { country: 'Romania', iso3: 'ROU', region: 'Europe', population: 19.2482, resources: 212.01, withdrawal: 7.864, stress: 7.362606497, agricultureShare: 0.3154, industryShare: 0.5231, efficiency: 24.30127216, irrigatedArea: 3.1703 },
  { country: 'Russia', iso3: 'RUS', region: 'Europe', population: 145.8362, resources: 4525.445, withdrawal: 60.667, stress: 3.858131763, agricultureShare: 0.2876, industryShare: 0.4479, efficiency: 19.924325048, irrigatedArea: 3.83 },
  { country: 'Rwanda', iso3: 'RWA', region: 'Africa', population: 13.3553, resources: 13.3, withdrawal: 0.61, stress: 6.552094522, agricultureShare: 0.6007, industryShare: 0.0166, efficiency: 13.83922228, irrigatedArea: 0.0681 },
  { country: 'Saint Vincent and the Grenadines', iso3: 'VCT', region: 'North America', population: 0.1028, resources: 0.1, withdrawal: 0.0079, stress: 7.9, agricultureShare: 0.0, industryShare: 0.0002, efficiency: 77.052610117, irrigatedArea: 0.0005 },
  { country: 'Sao Tome and Principe', iso3: 'STP', region: 'Africa', population: 0.222, resources: 2.18, withdrawal: 0.0409, stress: 1.876146789, agricultureShare: 0.6259, industryShare: 0.0147, efficiency: 8.205091137, irrigatedArea: 0.0073 },
  { country: 'Saudi Arabia', iso3: 'SAU', region: 'Asia', population: 31.3284, resources: 2.4, withdrawal: 23.38, stress: 974.166666667, agricultureShare: 0.8156, industryShare: 0.0539, efficiency: 26.301990284, irrigatedArea: 3.2789 },
  { country: 'Senegal', iso3: 'SEN', region: 'Africa', population: 17.2209, resources: 38.97, withdrawal: 3.0616, stress: 16.276448698, agricultureShare: 0.9131, industryShare: 0.0005, efficiency: 6.073011145, irrigatedArea: 0.1201 },
  { country: 'Serbia', iso3: 'SRB', region: 'Europe', population: 6.8354, resources: 162.2, withdrawal: 4.83, stress: 5.443480221, agricultureShare: 0.0853, industryShare: 0.7725, efficiency: 7.726873973, irrigatedArea: 0.0523 },
  { country: 'Sierra Leone', iso3: 'SLE', region: 'Africa', population: 8.0946, resources: 160.0, withdrawal: 0.2122, stress: 0.495794393, agricultureShare: 0.2154, industryShare: 0.2615, efficiency: 25.478220303, irrigatedArea: 0.0294 },
  { country: 'Slovakia', iso3: 'SVK', region: 'Europe', population: 5.4428, resources: 50.1, withdrawal: 0.5662731, stress: 2.436631239, agricultureShare: 0.0537, industryShare: 0.419, efficiency: 158.679133339, irrigatedArea: 0.0554 },
  { country: 'Slovenia', iso3: 'SVN', region: 'Europe', population: 2.1135, resources: 31.87, withdrawal: 0.931, stress: 6.29479378, agricultureShare: 0.0032, industryShare: 0.811, efficiency: 48.049821029, irrigatedArea: 0.0041 },
  { country: 'Somalia', iso3: 'SOM', region: 'Africa', population: 17.2714, resources: 14.7, withdrawal: 3.298, stress: 24.527740592, agricultureShare: 0.9948, industryShare: 0.0006, efficiency: 1.147242959, irrigatedArea: 0.2 },
  { country: 'South Africa', iso3: 'ZAF', region: 'Africa', population: 61.5026, resources: 51.35, withdrawal: 19.196, stress: 61.466538585, agricultureShare: 0.6169, industryShare: 0.2126, efficiency: 16.220827743, irrigatedArea: 2.2398 },
  { country: 'S. Sudan', iso3: 'SSD', region: 'Africa', population: 10.8658, resources: 49.5, withdrawal: 0.658, stress: 4.2261, agricultureShare: 0.3647, industryShare: 0.3419, efficiency: 10.0778, irrigatedArea: 0.019,},
  { country: 'Korea', iso3: 'KOR', region: 'Asia', population: 51.8484, resources: 69.7, withdrawal: 29.197, stress: 85.221833041, agricultureShare: 0.5893, industryShare: 0.1643, efficiency: 60.519411489, irrigatedArea: 0.8888 },
  { country: 'Solomon Is.', iso3: 'SLB', region: 'Oceania', population: 0.7, resources: 100.0, withdrawal: 0.01, stress: 0.01, agricultureShare: 0.8, industryShare: 0.1, efficiency: 10.0, irrigatedArea: 0.0,},
  { country: 'South Sudan', iso3: 'SSD', region: 'Africa', population: 10.8658, resources: 49.5, withdrawal: 0.658, stress: 4.226075787, agricultureShare: 0.3647, industryShare: 0.3419, efficiency: 10.077750251, irrigatedArea: 0.019 },
  { country: 'Spain', iso3: 'ESP', region: 'Europe', population: 47.7357, resources: 111.5, withdrawal: 29.02, stress: 43.25403923, agricultureShare: 0.6533, industryShare: 0.1895, efficiency: 38.75079401, irrigatedArea: 4.0776 },
  { country: 'Sri Lanka', iso3: 'LKA', region: 'Asia', population: 22.7004, resources: 52.8, withdrawal: 12.946, stress: 90.785413745, agricultureShare: 0.8736, industryShare: 0.0642, efficiency: 6.730774229, irrigatedArea: 0.57 },
  { country: 'Sudan', iso3: 'SDN', region: 'Africa', population: 48.0669, resources: 37.8, withdrawal: 26.935, stress: 118.656387665, agricultureShare: 0.9619, industryShare: 0.0028, efficiency: 2.819389052, irrigatedArea: 1.852 },
  { country: 'Suriname', iso3: 'SUR', region: 'South America', population: 0.6179, resources: 99.0, withdrawal: 0.6159, stress: 3.950609365, agricultureShare: 0.7, industryShare: 0.22, efficiency: 6.838913906, irrigatedArea: 0.0514 },
  { country: 'Swaziland', iso3: 'SWZ', region: 'Africa', population: 1.2, resources: 4.5, withdrawal: 0.7, stress: 15.6, agricultureShare: 0.9, industryShare: 0.05, efficiency: 3.0, irrigatedArea: 0.1,},
  { country: 'Sweden', iso3: 'SWE', region: 'Europe', population: 10.4161, resources: 174.0, withdrawal: 2.483, stress: 3.582972583, agricultureShare: 0.0493, industryShare: 0.6127, efficiency: 240.481754156, irrigatedArea: 0.1615 },
  { country: 'Switzerland', iso3: 'CHE', region: 'Europe', population: 8.707, resources: 53.5, withdrawal: 1.704, stress: 6.498855835, agricultureShare: 0.0933, industryShare: 0.3744, efficiency: 434.66597715, irrigatedArea: 0.052 },
  { country: 'Syria', iso3: 'SYR', region: 'Asia', population: 21.6288, resources: 16.802, withdrawal: 13.9644, stress: 124.360138926, agricultureShare: 0.8753, industryShare: 0.0367, efficiency: 0.961275248, irrigatedArea: 1.341 },
  { country: 'Tajikistan', iso3: 'TJK', region: 'Asia', population: 9.9669, resources: 21.91, withdrawal: 10.602, stress: 69.943264283, agricultureShare: 0.7453, industryShare: 0.1626, efficiency: 1.098495048, irrigatedArea: 0.7421 },
  { country: 'Tanzania', iso3: 'TZA', region: 'Africa', population: 62.8304, resources: 96.27, withdrawal: 5.184, stress: 12.96324081, agricultureShare: 0.8935, industryShare: 0.0048, efficiency: 9.369327653, irrigatedArea: 0.3635 },
  { country: 'Thailand', iso3: 'THA', region: 'Asia', population: 71.7273, resources: 438.61, withdrawal: 44.230038986, stress: 17.762354518, agricultureShare: 0.9037, industryShare: 0.0485, efficiency: 7.344966344, irrigatedArea: 6.415 },
  { country: 'Timor-Leste', iso3: 'TLS', region: 'Asia', population: 1.3501, resources: 8.215, withdrawal: 1.172, stress: 28.268210323, agricultureShare: 0.9138, industryShare: 0.0017, efficiency: 2.20837987, irrigatedArea: 0.0347 },
  { country: 'Togo', iso3: 'TGO', region: 'Africa', population: 8.8784, resources: 14.7, withdrawal: 0.223, stress: 3.391634981, agricultureShare: 0.3408, industryShare: 0.0283, efficiency: 24.2048659, irrigatedArea: 0.0079 },
  { country: 'Trinidad and Tobago', iso3: 'TTO', region: 'North America', population: 1.4877, resources: 3.84, withdrawal: 0.330541664, stress: 19.984381147, agricultureShare: 0.0436, industryShare: 0.3364, efficiency: 52.143876242, irrigatedArea: 0.007 },
  { country: 'Tunisia', iso3: 'TUN', region: 'Africa', population: 12.0486, resources: 4.615, withdrawal: 3.675, stress: 93.314374222, agricultureShare: 0.7494, industryShare: 0.0163, efficiency: 11.234930475, irrigatedArea: 0.447 },
  { country: 'Turkey', iso3: 'TUR', region: 'Asia', population: 86.6863, resources: 211.6, withdrawal: 58.4, stress: 43.378147515, agricultureShare: 0.8665, industryShare: 0.0199, efficiency: 15.410996349, irrigatedArea: 3.537 },
  { country: 'Turkmenistan', iso3: 'TKM', region: 'Asia', population: 7.092, resources: 24.765, withdrawal: 26.245, stress: 135.213807316, agricultureShare: 0.9275, industryShare: 0.0464, efficiency: 2.722733842, irrigatedArea: 1.991 },
  { country: 'Uganda', iso3: 'UGA', region: 'Africa', population: 45.9109, resources: 60.1, withdrawal: 0.637, stress: 5.82799634, agricultureShare: 0.4066, industryShare: 0.0785, efficiency: 41.599584328, irrigatedArea: 0.0111 },
  { country: 'Ukraine', iso3: 'UKR', region: 'Europe', population: 44.2986, resources: 175.28, withdrawal: 8.3671, stress: 10.84102099, agricultureShare: 0.2905, industryShare: 0.4246, efficiency: 9.110766281, irrigatedArea: 2.17 },
  { country: 'United Arab Emirates', iso3: 'ARE', region: 'Asia', population: 9.789, resources: 0.15, withdrawal: 2.275, stress: 1516.666666667, agricultureShare: 0.4567, industryShare: 0.0075, efficiency: 81.628573511, irrigatedArea: 0.0612 },
  { country: 'United Kingdom', iso3: 'GBR', region: 'Europe', population: 67.6688, resources: 147.0, withdrawal: 8.419, stress: 14.354646206, agricultureShare: 0.1405, industryShare: 0.12, efficiency: 324.76867904, irrigatedArea: 0.2271 },
  { country: 'United States', iso3: 'USA', region: 'North America', population: 340.1614, resources: 3069.0, withdrawal: 387.2834044, stress: 24.54267455, agricultureShare: 0.3966, industryShare: 0.472, efficiency: 46.716081084, irrigatedArea: 26.708 },
  { country: 'Uruguay', iso3: 'URY', region: 'South America', population: 3.3967, resources: 172.2, withdrawal: 4.4190948, stress: 11.815761497, agricultureShare: 0.7803, industryShare: 0.1248, efficiency: 11.030853344, irrigatedArea: 0.047 },
  { country: 'Uzbekistan', iso3: 'UZB', region: 'Asia', population: 34.2437, resources: 48.87, withdrawal: 42.5, stress: 121.881273301, agricultureShare: 0.9085, industryShare: 0.0412, efficiency: 2.481349107, irrigatedArea: 4.305 },
  { country: 'Venezuela', iso3: 'VEN', region: 'South America', population: 28.2378, resources: 1325.0, withdrawal: 22.6211, stress: 7.540366667, agricultureShare: 0.7385, industryShare: 0.0351, efficiency: 4.003525089, irrigatedArea: 1.0553 },
  { country: 'Vietnam', iso3: 'VNM', region: 'Asia', population: 98.9351, resources: 884.12, withdrawal: 80.17, stress: 17.755581148, agricultureShare: 0.9478, industryShare: 0.0375, efficiency: 3.539078019, irrigatedArea: 4.5851 },
  { country: 'W. Sahara', iso3: 'ESH', region: 'Africa', population: 0.597, resources: 0.8, withdrawal: 0.1, stress: 12.5, agricultureShare: 0.6, industryShare: 0.1, efficiency: 5.0, irrigatedArea: 0.001,},
  { country: 'Yemen', iso3: 'YEM', region: 'Asia', population: 37.1402, resources: 2.1, withdrawal: 5.911, stress: 281.476190476, agricultureShare: 0.9074, industryShare: 0.0182, efficiency: 4.788618285, irrigatedArea: 0.6804 },
  { country: 'Zambia', iso3: 'ZMB', region: 'Africa', population: 19.6036, resources: 104.8, withdrawal: 4.58729, stress: 8.274332612, agricultureShare: 0.7823, industryShare: 0.061, efficiency: 4.799056332, irrigatedArea: 0.1559 },
  { country: 'Zimbabwe', iso3: 'ZWE', region: 'Africa', population: 15.7972, resources: 20.0, withdrawal: 4.909679395, stress: 46.091620306, agricultureShare: 0.872, industryShare: 0.0166, efficiency: 3.634962491, irrigatedArea: 0.2182 },
]

export const years = [2020, 2021, 2022]
export const regions = Array.from(new Set(countryBases.map((country) => country.region)))

const growthByRegion: Record<Region, number> = {
  'Asia': 0.0058,
  'Africa': 0.0246,
  'Europe': 0.0003,
  'North America': 0.0050,
  'South America': 0.0069,
  'Oceania': 0.0112,
}

function rounded(value: number, decimals = 2): number {
  return Number(value.toFixed(decimals))
}

export const mockData: CountryYearRecord[] = countryBases.flatMap((base) => {
  const signature = [...base.iso3].reduce((total, character) => total + character.charCodeAt(0), 0)
  return years.map((year, index) => {
    const yearsFromBase = year - 2022
    const resourcePulse = [1.018, .982, 1][index] * (1 + ((signature % 7) - 3) * .004)
    const withdrawalTrend = 1 + yearsFromBase * (.014 + (signature % 3) * .003)
    const population = base.population * Math.pow(1 + growthByRegion[base.region], yearsFromBase)
    const renewableWaterResources = base.resources * resourcePulse
    const totalWaterWithdrawal = base.withdrawal * withdrawalTrend
    const stressPulse = [1.025, 1.045, 1][index] * (1 + ((signature % 5) - 2) * .005)
    const waterStress = base.stress * stressPulse
    const agriculturalWithdrawal = totalWaterWithdrawal * base.agricultureShare
    const industrialWithdrawal = totalWaterWithdrawal * base.industryShare
    const municipalWithdrawal = totalWaterWithdrawal - agriculturalWithdrawal - industrialWithdrawal

    return {
      country: base.country,
      iso3: base.iso3,
      region: base.region,
      year,
      population: rounded(population),
      waterStress: rounded(waterStress, 1),
      renewableWaterResources: rounded(renewableWaterResources),
      totalWaterWithdrawal: rounded(totalWaterWithdrawal),
      agriculturalWithdrawal: rounded(agriculturalWithdrawal),
      industrialWithdrawal: rounded(industrialWithdrawal),
      municipalWithdrawal: rounded(municipalWithdrawal),
      waterUseEfficiency: rounded(base.efficiency * (1 + yearsFromBase * .028) * (1 + ((signature % 3) - 1) * .006), 1),
      irrigatedArea: rounded(base.irrigatedArea * (1 + yearsFromBase * .009), 2),
    }
  })
})

export const countryCount = countryBases.length
