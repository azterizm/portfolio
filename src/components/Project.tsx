import { useHookstate } from '@hookstate/core'
import classNames from 'classnames'
import type { ReactElement } from 'react'
import { projects } from '../constants/project'
import {
  seeMoreState,
  seeReviewsState,
  selectedProjectState,
  showAboutState,
} from '../state/project'
import ContentViewer from './ContentViewer'
import ProjectInfo from './ProjectInfo'

export interface ProjectProps {
  data: (typeof projects)[number]
  index: number
}

export default function Project(props: ProjectProps): ReactElement {
  const selectedProject = useHookstate(selectedProjectState)
  const seeMore = useHookstate(seeMoreState)
  const seeReviews = useHookstate(seeReviewsState)
  const showAbout = useHookstate(showAboutState)
  return (
    <div
      className={classNames(
        'h-screen overflow-hidden absolute top-0 left-0 transition-all duration-500',
        selectedProject.value === props.index && !showAbout.value
          ? 'w-full'
          : 'w-0',
      )}
      id={`project-${props.index}`}
    >
      <div
        className={classNames(
          'grid grid-cols-4 md:grid-cols-8 w-screen h-screen',
        )}
      >
        <div className={classNames('col-span-4 overflow-hidden mt-5 md:mt-0')}>
          <div
            className={classNames(
              'overflow-hidden transition-all duration-500',
              seeMore.value || seeReviews.value ? 'h-0' : 'h-full',
            )}
          >
            <img
              src={props.data.logo}
              className='h-1/2 scale-75 translate-y-8 sm:scale-100 sm:translate-y-0 sm:h-full md:h-screen w-[70%] object-contain mx-auto'
            />
          </div>
          <ContentViewer
            projectIndex={props.index}
            images={props.data.images || []}
            videos={props.data.videos || []}
            logoPath={props.data.logo}
          />
          <div
            className={classNames(
              'w-full h-full flex flex-col space-y-4 p-4 transition-all duration-500',
              seeReviews.value
                ? 'overflow-auto h-full'
                : 'pointer-events-none opacity-0 overflow-auto h-0',
            )}
          >
            {props.data.reviews?.map((review, i) => (
              <div
                key={i}
                className='w-full p-4 rounded-lg bg-neutral-200 h-max'
              >
                <p>{review.content}</p>
                <h1 className='mt-2 text-lg font-bold'>{review.by}</h1>
              </div>
            ))}
          </div>
        </div>
        <ProjectInfo
          reviews={props.data.reviews || []}
          underDevelopment={props.data.underDevelopment}
          title={props.data.title}
          subtitle={props.data.subtitle}
          by={props.data.by}
          href={props.data.site}
          description={props.data.description}
        />
        <div className='col-span-2 text-center my-auto ml-5'>
          {props.data.googlePlay && (
            <button
              onClick={() => window.open(props.data.googlePlay, '_blank')}
            >
              <img
                className='w-40'
                id='google_play_button'
                src='/badges/google-play.png'
              />
            </button>
          )}
          {props.data.appStore && (
            <button onClick={() => window.open(props.data.appStore, '_blank')}>
              <img className='w-40' src='/badges/app-store.png' />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
