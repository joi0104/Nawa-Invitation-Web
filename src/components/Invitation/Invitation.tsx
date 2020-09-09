/* External dependencies */
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import _ from 'lodash'

/* Internal dependencies */
import Helmet from 'components/Helmet'
import TextUnderline from 'elements/TextUnderline'
import Map from 'elements/Map'
import SVGIcon from 'elements/SVGIcon'
import TextCarousel from 'elements/TextCarousel'
import WithNewline from 'hocs/WithNewline'
import InvitationModel from 'models/Invitation'
import MapModel from 'models/Map'
import UserAgentService from 'services/UserAgentService'
import { getDate, getTime } from 'utils/dateUtils'
import styled from './Invitation.module.scss'
import appDownload from 'assets/images/app-download.png'
import getMore from 'assets/images/get-more.png'

interface InvitationProps {
  invitation: InvitationModel
}

const cx = classNames.bind(styled)

function Invitation({ invitation }: InvitationProps) {
  const { map } = invitation
  const { latitude, longitude } = map as MapModel

  const mapSection = useMemo(
    () => (
      <div className={cx('content-section')}>
        <div className={cx('content-info-title')}>
          <SVGIcon name="map" />
          <p>주소</p>
        </div>
        <div className={cx('info-content')}>
          {UserAgentService.isPhone() ? (
            <a href={`kakaomap://look?p=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">
              <Map map={map as MapModel} placeName={invitation.placeName} />
            </a>
          ) : (
            <Map map={map as MapModel} placeName={invitation.placeName} />
          )}
        </div>
      </div>
    ),
    [latitude, longitude, map, invitation.placeName],
  )

  return (
    <>
      <Helmet title={`나와 - ${invitation.title}`} />
      <div className={cx('template-wrapper')}>
        <header>
          <div className={cx('character-wrapper')}>
            <img src={invitation.mainImage} alt="" />
          </div>
        </header>
        <section>
          <article className={cx('template-description')}>
            <TextUnderline className={cx('title')}>{invitation.title}</TextUnderline>
            <p className={cx('description')}>
              <WithNewline>{invitation.contents}</WithNewline>
            </p>
          </article>
          <article className={cx('template-content')}>
            <div className={cx('content-section')}>
              <div className={cx('info-top-bar')}>
                <TextUnderline className={cx('info-top-title')}>모임 정보</TextUnderline>
                <p>{invitation.description}</p>
              </div>
              <div className={cx('infos')}>
                <div className={cx('info', 'date-wrapper')}>
                  <div className={cx('info-title')}>
                    <div className={cx('icon-wrapper')}>
                      <SVGIcon name="calendar" />
                    </div>
                    <p>모임 날짜</p>
                  </div>
                  <div className={cx('info-content')}>{getDate(invitation.time)}</div>
                </div>
                <div className={cx('info', 'time-wrapper')}>
                  <div className={cx('info-title')}>
                    <div className={cx('icon-wrapper')}>
                      <SVGIcon name="time" />
                    </div>
                    <p>모임 시간</p>
                  </div>
                  <div className={cx('info-content')}>{getTime(invitation.time)}</div>
                </div>
                <div className={cx('info', 'location-wrapper')}>
                  <div className={cx('info-title')}>
                    <div className={cx('icon-wrapper')}>
                      <SVGIcon name="location" />
                    </div>
                    <p>모임 장소</p>
                  </div>
                  <div className={cx('info-content')}>
                    <TextCarousel content={invitation.placeName} />
                  </div>
                </div>
              </div>
            </div>
            {_.isNil(map) || mapSection}
          </article>
        </section>
        <footer>
          <p className={cx('footer-title')}>
            편리하게 사용하셨다면,
            <br />
            구글앱스토어에서
            <br />
            '나와 초대장'을 직접 다운받아보세요!
          </p>
          <div className={cx('footer-buttons')}>
            <div className={cx('footer-button', 'app-download')}>
              <a href="https://danivelop.com">
                <img src={appDownload} alt="" />
              </a>
            </div>
            <div className={cx('footer-button', 'app-download')}>
              <Link to="/">
                <img src={getMore} alt="" />
              </Link>
            </div>
          </div>
          <div className={cx('introduction-member')}>
            <p className={cx('introduction-main-title')}>만든 이</p>
            <div className={cx('introduction-section')}>
              <p className={cx('introduction-sub-title')}>안드로이드 개발</p>
              <p className={cx('introduction-content')}>이두한,이진성,신초희,유현선</p>
            </div>
            <div className={cx('introduction-section')}>
              <p className={cx('introduction-sub-title')}>웹 개발</p>
              <p className={cx('introduction-content')}>윤대용,최진영</p>
            </div>
            <div className={cx('introduction-section')}>
              <p className={cx('introduction-sub-title')}>백앤드 개발</p>
              <p className={cx('introduction-content')}>김재현,권수연</p>
            </div>
            <div className={cx('introduction-section')}>
              <p className={cx('introduction-sub-title')}>UX/UI 디자인</p>
              <p className={cx('introduction-content')}>고은이,전다영</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default React.memo(Invitation)
