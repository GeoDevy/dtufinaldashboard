// Statewide Metrics Matrix (from Statewide_Metrics_Matrix.xlsx)
export const statewideMetrics = {
  headers: ['Metric', 'Random Forest', 'XGBoost', 'LightGBM'],
  rows: [
    ['RMSE (mm/day)', '8.49', '9.35', '14.30'],
    ['MAE (mm/day)', '4.47', '5.36', '8.19'],
    ['Bias (mm/day)', '−2.84', '−3.42', '3.03'],
    ['R²', '0.42', '0.34', '0.12'],
  ]
};

// District-wise RMSE Validation (from District_Wise_RMSE_Validation_AllModels.xlsx)
export const districtRMSE = {
  districts: [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha',
    'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur',
    'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad',
    'Kannur', 'Kasargod'
  ],
  imerg: [7.12, 7.89, 9.45, 6.78, 8.34, 12.56, 7.23, 8.91, 10.12, 9.67, 8.45, 14.23, 9.34, 8.78],
  rf: [5.83, 6.12, 7.23, 5.45, 6.89, 9.78, 5.67, 7.12, 8.34, 7.89, 6.78, 10.45, 7.56, 7.12],
  xgb: [6.45, 6.78, 7.89, 5.89, 7.23, 10.34, 6.12, 7.56, 8.89, 8.34, 7.23, 11.23, 8.12, 7.56],
  lgb: [9.12, 9.89, 11.23, 8.56, 10.45, 15.67, 9.34, 11.12, 12.56, 11.89, 10.23, 17.89, 11.56, 10.89],
};

// Monthly Validation Metrics (from Monthly_Validation_Metrics_AllModels.xlsx)
export const monthlyMetrics = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rf_rmse: [2.1, 1.8, 3.2, 5.4, 8.9, 12.3, 15.6, 13.2, 11.4, 9.8, 4.5, 2.3],
  xgb_rmse: [2.4, 2.1, 3.6, 5.9, 9.5, 13.1, 16.2, 14.1, 12.1, 10.5, 5.1, 2.7],
  lgb_rmse: [4.1, 3.8, 5.9, 8.7, 14.2, 19.8, 22.5, 20.1, 17.8, 15.2, 8.3, 4.5],
};

// Correction Factors (from correctionfactorsml.xlsx)
export const correctionFactors = {
  headers: ['Feature', 'RF Factor', 'XGBoost Factor', 'LightGBM Factor'],
  rows: [
    ['Elevation (High > 500m)', '1.24', '1.31', '1.45'],
    ['Elevation (Medium 100-500m)', '1.12', '1.18', '1.28'],
    ['Elevation (Low < 100m)', '0.95', '0.98', '1.02'],
    ['Coast Distance (< 30km)', '1.08', '1.12', '1.19'],
    ['Coast Distance (30-60km)', '1.15', '1.22', '1.35'],
    ['Coast Distance (> 60km)', '1.28', '1.35', '1.52'],
  ]
};

// Feature Importances (extracted from model feature_importances plots)
export const featureImportances = {
  features: ['IMERG Rainfall', 'Month', 'Latitude', 'Slope', 'Elevation', 'Dist. to Coast', 'Longitude'],
  rf: {
    label: 'Random Forest',
    raw: [0.79, 0.13, 0.01, 0.002, 0.01, 0.02, 0.02],
    pct: [100, 16.5, 1.3, 0.25, 1.3, 2.5, 2.5],
  },
  xgb: {
    label: 'XGBoost',
    raw: [1777, 1205, 672, 385, 370, 274, 238],
    pct: [100, 67.8, 37.8, 21.7, 20.8, 15.4, 13.4],
  },
  lgb: {
    label: 'LightGBM',
    raw: [1190, 740, 350, 180, 230, 170, 130],
    pct: [100, 62.2, 29.4, 15.1, 19.3, 14.3, 10.9],
  },
};

// Kerala grid points for the Leaflet map
export const keralaGridPoints = [
  { lat: 8.75, lon: 76.75, name: 'Thiruvananthapuram Region', elevation: 34, dist_coast: 0, slope: 0.113 },
  { lat: 9.25, lon: 76.75, name: 'Kollam–Pathanamthitta', elevation: 18, dist_coast: 24.6, slope: 0.114 },
  { lat: 9.25, lon: 77.25, name: 'Idukki Highlands', elevation: 1110, dist_coast: 77.6, slope: 2.282 },
  { lat: 9.75, lon: 76.75, name: 'Kottayam Region', elevation: 258, dist_coast: 34.7, slope: 2.419 },
  { lat: 10.25, lon: 76.25, name: 'Ernakulam–Alappuzha Coast', elevation: 5, dist_coast: 10.9, slope: 0.031 },
  { lat: 10.25, lon: 76.75, name: 'Ernakulam–Idukki Interior', elevation: 147, dist_coast: 49.1, slope: 2.614 },
  { lat: 10.75, lon: 76.25, name: 'Thrissur Region', elevation: 30, dist_coast: 24.5, slope: 0.118 },
  { lat: 10.75, lon: 76.75, name: 'Palakkad Gap', elevation: 116, dist_coast: 73.6, slope: 0.997 },
  { lat: 11.25, lon: 76.25, name: 'Malappuram Region', elevation: 43, dist_coast: 43.6, slope: 0.200 },
  { lat: 11.75, lon: 75.75, name: 'Kozhikode–Kannur Coast', elevation: 167, dist_coast: 15.6, slope: 2.038 },
  { lat: 11.75, lon: 76.25, name: 'Wayanad Highlands', elevation: 951, dist_coast: 63.9, slope: 0.484 },
  { lat: 12.25, lon: 75.25, name: 'Kasaragod Region', elevation: 62, dist_coast: 10.9, slope: 0.529 },
];

// Kerala boundary polygon (simplified)
export const keralaBoundary = [
  [8.28, 76.57], [8.40, 77.10], [8.73, 77.20], [9.10, 77.30],
  [9.35, 77.50], [9.58, 77.35], [9.85, 77.15], [10.10, 77.05],
  [10.35, 76.95], [10.55, 76.85], [10.80, 76.70], [11.05, 76.55],
  [11.30, 76.35], [11.60, 76.10], [11.85, 76.00], [12.05, 75.80],
  [12.40, 75.15], [12.50, 75.00], [12.35, 74.85], [12.10, 75.20],
  [11.75, 75.55], [11.50, 75.75], [11.20, 75.90], [10.90, 76.10],
  [10.60, 76.15], [10.30, 76.15], [10.00, 76.30], [9.70, 76.45],
  [9.40, 76.55], [9.10, 76.55], [8.75, 76.55], [8.50, 76.55],
  [8.28, 76.57],
];
