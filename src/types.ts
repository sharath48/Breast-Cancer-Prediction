/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DiagnosticMeasurements {
  radius_mean: number;
  texture_mean: number;
  perimeter_mean: number;
  area_mean: number;
  smoothness_mean: number;
  compactness_mean: number;
  concavity_mean: number;
  concave_points_mean: number;
  symmetry_mean: number;
  fractal_dimension_mean: number;
}

export interface PredictionResult {
  diagnosis: 'Malignant' | 'Benign';
  confidence: number;
  riskScore: number;
  reasoning: string;
  keyFactors: {
    factor: string;
    impact: 'High' | 'Medium' | 'Low';
    description: string;
  }[];
}

export type ModelType = 'Logistic Regression' | 'Random Forest' | 'Gradient Boosting' | 'SVM' | 'MLP Neural Network' | 'Gemini AI (Hybrid)';

export interface ModelMetric {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  auc: number;
}
