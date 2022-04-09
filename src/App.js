import React, { useState, useEffect, useCallback, Fragment } from 'react'
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

  const setNextSlide = useCallback(() => {
    setActiveIndex((currIndex) => currIndex === catalogs.length - 1 ? 0 : currIndex + 1);
  }, [ catalogs ]);

  const setPreviousSlide = useCallback(() => {
    setActiveIndex((currIndex) => currIndex === 0 ? catalogs.length - 1 : currIndex - 1);
  }, [ catalogs ]);

  useEffect(() => {
    if (!isSlideShowInProgress) return;
    const intervalId = setInterval(setNextSlide, SLIDE_DURATION_MS);
    return () => clearInterval(intervalId);
  }, [ setNextSlide, isSlideShowInProgress ]);

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
                    onClick={ setPreviousSlide }
                >
                  <i className="material-icons">arrow_back</i>
                </button>
                <Thumbs
                    items={ catalogs }
                    currentIndex={ activeIndex }
                    onSelect={ (newSlideIndex) => setActiveIndex(newSlideIndex) }
                />
                <button
                    className="icon-only outlined"
                    data-testid="next-slide-btn"
                    onClick={ setNextSlide }
                >
                  <i className="material-icons">arrow_forward</i>
                </button>
              </div>
            </div>
          </div>
          <div className='layout-row justify-content-center mt-25'>
            <input
                type='checkbox'
                data-testid='toggle-slide-show-button'
                checked={ isSlideShowInProgress }
                onChange={ () => setIsSlideShowInProgress((prevState) => !prevState) }
            />
            <label className='ml-6'>Start Slide Show</label>
          </div>
        </div>
      </Fragment>
  )
}

export default App

