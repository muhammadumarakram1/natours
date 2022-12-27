const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getTour,
  uploadTourImages,
  resizeTourImages,
  createTour,
  getTours,
  updateTour,
  deleteTour,
  getTourStat,
  getMothlyPlan,
  getToursWithin,
  getDistances,
} = require('../controllers/tourController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
router.route('/tour-stats').get(getTourStat);
router.route('/monthly-plan/:year').get(protect, getMothlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);
router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getTours)
  .post(protect, restrictTo('admin', 'lead-guide', 'guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide', 'guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
