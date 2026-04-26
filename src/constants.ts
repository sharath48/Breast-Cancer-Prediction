/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModelMetric } from './types';

export const FEATURE_INFO = [
  { key: 'radius_mean', label: 'Mean Radius', min: 6, max: 30, step: 0.1, unit: 'mm', desc: 'Mean of distances from center to points on the perimeter' },
  { key: 'texture_mean', label: 'Mean Texture', min: 9, max: 40, step: 0.1, unit: 'px', desc: 'Standard deviation of gray-scale values' },
  { key: 'perimeter_mean', label: 'Mean Perimeter', min: 43, max: 190, step: 1, unit: 'mm', desc: 'Mean size of the core tumor' },
  { key: 'area_mean', label: 'Mean Area', min: 143, max: 2500, step: 1, unit: 'mm²', desc: 'Mean surface area of the tumor' },
  { key: 'smoothness_mean', label: 'Mean Smoothness', min: 0.05, max: 0.2, step: 0.001, unit: '', desc: 'Mean of local variation in radius lengths' },
  { key: 'compactness_mean', label: 'Mean Compactness', min: 0.02, max: 0.4, step: 0.001, unit: '', desc: 'Perimeter² / area - 1.0' },
  { key: 'concavity_mean', label: 'Mean Concavity', min: 0, max: 0.5, step: 0.001, unit: '', desc: 'Severity of concave portions of the contour' },
  { key: 'concave_points_mean', label: 'Mean Concave Points', min: 0, max: 0.2, step: 0.001, unit: '', desc: 'Number of concave portions of the contour' },
  { key: 'symmetry_mean', label: 'Mean Symmetry', min: 0.1, max: 0.3, step: 0.001, unit: '', desc: 'Relative symmetry of the tumor shape' },
  { key: 'fractal_dimension_mean', label: 'Mean Fractal Dim', min: 0.05, max: 0.1, step: 0.001, unit: '', desc: 'Coastline approximation - 1' },
] as const;

export const MODEL_METRICS: ModelMetric[] = [
  { name: 'Logistic Regression', accuracy: 0.94, precision: 0.93, recall: 0.92, f1: 0.92, auc: 0.96 },
  { name: 'Random Forest', accuracy: 0.96, precision: 0.95, recall: 0.96, f1: 0.95, auc: 0.98 },
  { name: 'Gradient Boosting', accuracy: 0.97, precision: 0.96, recall: 0.97, f1: 0.96, auc: 0.99 },
  { name: 'SVM', accuracy: 0.95, precision: 0.94, recall: 0.94, f1: 0.94, auc: 0.97 },
  { name: 'MLP Neural Network', accuracy: 0.96, precision: 0.95, recall: 0.95, f1: 0.95, auc: 0.98 },
  { name: 'Gemini AI', accuracy: 0.98, precision: 0.97, recall: 0.98, f1: 0.97, auc: 0.99 },
];

export const ROC_DATA = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.8 },
  { fpr: 0.1, tpr: 0.92 },
  { fpr: 0.2, tpr: 0.96 },
  { fpr: 0.4, tpr: 0.98 },
  { fpr: 0.6, tpr: 0.99 },
  { fpr: 1, tpr: 1 },
];
