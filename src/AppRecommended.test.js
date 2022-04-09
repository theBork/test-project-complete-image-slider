import React from 'react'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppRecommended from './AppRecommended'
import { image1, image2, image3, image4 } from './assets/images'

jest.useFakeTimers()

const TEST_IDS = {
  viewerId: 'catalog-view',
  prevBtnId: 'prev-slide-btn',
  nextBtnId: 'next-slide-btn',
  thumbBtnPrefix: 'thumb-button-',
  toggleSlideShowBtnId: 'toggle-slide-show-button',
};

describe('Catalog Viewer', () => {

  let getByTestId
  let viewer
  let prevBtn
  let nextBtn
  let toggleSlideShowBtn
  let catalogs
  let thumbBtn2
  let thumbBtn4

  beforeEach(() => {
    const app = render(<AppRecommended />)
    getByTestId = app.getByTestId
    viewer = getByTestId(TEST_IDS.viewerId)
    prevBtn = getByTestId(TEST_IDS.prevBtnId)
    nextBtn = getByTestId(TEST_IDS.nextBtnId)
    thumbBtn2 = getByTestId(TEST_IDS.thumbBtnPrefix + '1')
    thumbBtn4 = getByTestId(TEST_IDS.thumbBtnPrefix + '3')
    toggleSlideShowBtn = getByTestId(TEST_IDS.toggleSlideShowBtnId)

    catalogs = [
      {
        thumb: image1,
        image: image1
      },
      {
        thumb: image2,
        image: image2
      },
      {
        thumb: image3,
        image: image3
      },
      {
        thumb: image4,
        image: image4
      }
    ]
  })

  afterEach(() => {
    cleanup()
  })

  // If you add this test into App.test.js, it will fail
  test('when slideshow in progress should refresh timer when user interact with buttons', () => {
    expect(viewer.src).toContain(catalogs[0].image)
    fireEvent.click(toggleSlideShowBtn, { button: '0' })

    // Check that slideshow works
    act (() => jest.advanceTimersByTime(3010))
    expect(viewer.src).toContain(catalogs[1].image)

    // Check that clicking on next button refreshing the slide timer
    act (() => jest.advanceTimersByTime(2510))
    fireEvent.click(nextBtn, { button: '0' })
    expect(viewer.src).toContain(catalogs[2].image)
    act (() => jest.advanceTimersByTime(2510))
    expect(viewer.src).toContain(catalogs[2].image)

    // Check that clicking on prev button refreshing the slide timer
    fireEvent.click(prevBtn, { button: '0' })
    expect(viewer.src).toContain(catalogs[1].image)
    act (() => jest.advanceTimersByTime(2510))
    expect(viewer.src).toContain(catalogs[1].image)

    // Check that clicking on specific image button refreshing the slide timer
    fireEvent.click(thumbBtn4, { button: '0' })
    expect(viewer.src).toContain(catalogs[3].image)
    act (() => jest.advanceTimersByTime(2510))
    expect(viewer.src).toContain(catalogs[3].image)
  })
})