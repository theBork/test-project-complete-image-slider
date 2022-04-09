import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'
const SLIDE_DURATION_MS = 3000;

function App() {
  const catalogsList = [
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

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ isSlideShowInProgress, setIsSlideShowInProgress ] = useState(false)
  const slideshowIntervalRef = useRef(null);

  const setNextSlide = useCallback(() => {
    setActiveIndex((currIndex) => currIndex === catalogs.length - 1 ? 0 : currIndex + 1);
  }, [ catalogs ]);

  const setPreviousSlide = useCallback(() => {
    setActiveIndex((currIndex) => currIndex === 0 ? catalogs.length - 1 : currIndex - 1);
  }, [ catalogs ]);

  const clearSlideshowInterval = useCallback(() => {
    if (!slideshowIntervalRef.current) return;
    clearInterval(slideshowIntervalRef.current);
  }, []);

  const planSlideshowInterval = useCallback(() => {
    clearSlideshowInterval();
    slideshowIntervalRef.current = setInterval(setNextSlide, SLIDE_DURATION_MS);
  }, [ clearSlideshowInterval, setNextSlide ])

  const handleClickNextButton = () => {
    if (isSlideShowInProgress) planSlideshowInterval();
    setNextSlide();
  }

  const handleClickPreviousButton = () => {
    if (isSlideShowInProgress) planSlideshowInterval();
    setPreviousSlide();
  }

  const handleSelectSlide = (slideIndex) => {
    if (isSlideShowInProgress) planSlideshowInterval();
    setActiveIndex(slideIndex);
  }

  // Clear slideshow interval when unmount
  useEffect(() => {
    return () => clearSlideshowInterval();
  }, [ clearSlideshowInterval ]);

  // Plan slideshow interval when checkbox is checking
  useEffect(() => {
    isSlideShowInProgress ? planSlideshowInterval() : clearSlideshowInterval();
  }, [ setNextSlide, isSlideShowInProgress, clearSlideshowInterval, planSlideshowInterval ]);

  return (
      <Fragment>
        <h8k-navbar header={ title } />
        <div className='layout-column justify-content-center mt-75'>
          <div className='layout-row justify-content-center'>
            <div className='card pt-25'>
              <Viewer catalogImage={ catalogs[activeIndex].image } />
              <div className='layout-row justify-content-center align-items-center mt-20'>
                <button
                    className="icon-only outlined"
                    data-testid="prev-slide-btn"
                    onClick={ handleClickPreviousButton }
                >
                  <i className="material-icons">arrow_back</i>
                </button>
                <Thumbs
                    items={ catalogs }
                    currentIndex={ activeIndex }
                    onSelect={ handleSelectSlide }
                />
                <button
                    className="icon-only outlined"
                    data-testid="next-slide-btn"
                    onClick={ handleClickNextButton }
                >
                  <i className="material-icons">arrow_forward</i>
                </button>
              </div>
            </div>
          </div>
          <div className='layout-row justify-content-center mt-25'>
            <input
                id="slideshow_checkbox"
                type='checkbox'
                data-testid='toggle-slide-show-button'
                checked={ isSlideShowInProgress }
                onChange={ () => setIsSlideShowInProgress((prevState) => !prevState) }
            />
            <label htmlFor="slideshow_checkbox" className='ml-6'>Start Slide Show</label>
          </div>
        </div>
      </Fragment>
  )
}

export default App
