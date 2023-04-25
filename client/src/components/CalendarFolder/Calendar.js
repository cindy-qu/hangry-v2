import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Calendar = ({ user }) => {
    const [updated, setUpdated] = useState(false);

const paramsObj = useParams()

const paramsId = parseInt(paramsObj.id)

const [updateRestaurantName, setUpdateRestaurantName] = useState("")

const bookmarkId = user.restaurants
let matchRestaurantName = bookmarkId.find(book => book.id === paramsId ? book.id : '')
// console.log(matchRestaurantName)
useEffect(() => {
    setUpdateRestaurantName(matchRestaurantName.restaurant_name)
  }, [paramsId])

    // form state
    // const [restaurantName, setRestaurantName] = useState("")
    const [restaurantStart, setRestaurantStart] = useState("")
    const [restaurantEnd, setRestaurantEnd] = useState("")
    const [restaurantTimezone, setRestaurantTimezone] = useState("")
    // values from form input
    // const handleRestaurantName = (e) => {
    //     setRestaurantName(e.target.value)
    // }

    const handleRestaurantStart = (e) => {
        setRestaurantStart(e.target.value)
    }

    const handleRestaurantEnd = (e) => {
        setRestaurantEnd(e.target.value)
    }

    const handleRestaurantTimezone = (e) => {
        setRestaurantTimezone(e.target.value)
    }


// google calendar
    var gapi = window.gapi


    var CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    var API_KEY = process.env.REACT_APP_GOOGLE_KEY

    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const handleSubmitEvent = (e) => {
        e.preventDefault()
        setUpdated(updated => !updated)
        gapi.load('client:auth2', () => {
            
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
                plugin_name: 'hello',
                cookiepolicy: 'single_host_origin',
            })

            gapi.client.load('calendar', 'v3', () => console.log('Loaded!'))

            gapi.auth2.getAuthInstance().signIn()
            .then(() => {

                var event = {
                    'summary': `${matchRestaurantName?.restaurant_name}`,
          
             
                    'start': {
                      'dateTime': new Date(restaurantStart),
                      'timeZone': [restaurantTimezone]
                    },
                    'end': {
                      'dateTime': new Date(restaurantEnd),
                      'timeZone': [restaurantTimezone]
                    },
                    'recurrence': [
                      'RRULE:FREQ=DAILY;COUNT=1'
                    ],
                    'attendees': [
                    ],
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                      ]
                    }
                  }

                  var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                  })

                  request.execute(event => {
                    // console.log(event)
                    window.open(event.htmlLink)
                    console.log(event.htmlLink)
                  })

            })
        })
        
    }
    const editCalendarEvent = updated ? '' : 'hidden';
// console.log((new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]))
  return (
    <div className="bg-cover bg-bottom   bg-no-repeat  h-[calc(100vh-64px)] overflow-auto w-full bg-[length:60rem] 
    sm:bg-[length:60rem]
    md:bg-[length:65rem] 
    lg:bg-[length:70rem] 
    xl:bg-[length:70rem] 
    2xl:bg-[length:75rem]
    bg-[url('./ImagesFolder/calendar.jpg')] ">
        <h1 className="text-center text-3xl mt-1 mb-5">Create Event</h1>
        <form className="mb-3 text-center" onSubmit={handleSubmitEvent}>
            
            <label className="mr-2">Restaurant</label>
            <input className="pl-1 bg-white rounded-md outline outline-1 outline-[#ced4da]"
                id="restaurant_name"
                type="text"
                disabled
                value={updateRestaurantName}
                onChange={setUpdateRestaurantName}
                required/>
            <br></br>

            <label className="mr-2">Start</label>
            <input className="pl-1 mt-3 bg-white rounded-md outline outline-1 outline-[#ced4da]" 
                type="datetime-local" 
                id="restaurant_start" 
                value={restaurantStart} 
                onChange={handleRestaurantStart} 
                min = "2022-12-05T00:00:00"
                required/>
            <br></br>
            <label className="mr-2 ">End</label>
            <input className="pl-1 mt-3 bg-white rounded-md outline outline-1 outline-[#ced4da]" 
                type="datetime-local" 
                id="restaurant_end" 
                value={restaurantEnd} 
                onChange={handleRestaurantEnd} 
                min = "2022-12-05T00:00:00"
                required/>
            
            <br></br>
            <label className="mr-2">Timezone</label>
            <select className="pl-1 mt-3 mb-3 bg-white rounded-md outline outline-1 outline-[#ced4da]" name="timezone" id="restaurant_start" value={restaurantTimezone} onChange={handleRestaurantTimezone} required>
                <option></option>
                <option value="Etc/GMT+12">(GMT-12:00) International Date Line West</option>
                <option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option>
                <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                <option value="US/Alaska">(GMT-09:00) Alaska</option>
                <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                <option value="America/Tijuana">(GMT-08:00) Tijuana, Baja California</option>
                <option value="US/Arizona">(GMT-07:00) Arizona</option>
                <option value="America/Chihuahua">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                <option value="US/Mountain">(GMT-07:00) Mountain Time (US & Canada)</option>
                <option value="America/Managua">(GMT-06:00) Central America</option>
                <option value="US/Central">(GMT-06:00) Central Time (US & Canada)</option>
                <option value="America/Mexico_City">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                <option value="Canada/Saskatchewan">(GMT-06:00) Saskatchewan</option>
                <option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                <option value="US/Eastern">(GMT-05:00) Eastern Time (US & Canada)</option>
                <option value="US/East-Indiana">(GMT-05:00) Indiana (East)</option>
                <option value="Canada/Atlantic">(GMT-04:00) Atlantic Time (Canada)</option>
                <option value="America/Caracas">(GMT-04:00) Caracas, La Paz</option>
                <option value="America/Manaus">(GMT-04:00) Manaus</option>
                <option value="America/Santiago">(GMT-04:00) Santiago</option>
                <option value="Canada/Newfoundland">(GMT-03:30) Newfoundland</option>
                <option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option>
                <option value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires, Georgetown</option>
                <option value="America/Godthab">(GMT-03:00) Greenland</option>
                <option value="America/Montevideo">(GMT-03:00) Montevideo</option>
                <option value="America/Noronha">(GMT-02:00) Mid-Atlantic</option>
                <option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option>
                <option value="Atlantic/Azores">(GMT-01:00) Azores</option>
                <option value="Africa/Casablanca">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                <option value="Etc/Greenwich">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                <option value="Europe/Amsterdam">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                <option value="Europe/Belgrade">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                <option value="Europe/Brussels">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                <option value="Europe/Sarajevo">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                <option value="Africa/Lagos">(GMT+01:00) West Central Africa</option>
                <option value="Asia/Amman">(GMT+02:00) Amman</option>
                <option value="Europe/Athens">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                <option value="Asia/Beirut">(GMT+02:00) Beirut</option>
                <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                <option value="Africa/Harare">(GMT+02:00) Harare, Pretoria</option>
                <option value="Europe/Helsinki">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                <option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</option>
                <option value="Europe/Minsk">(GMT+02:00) Minsk</option>
                <option value="Africa/Windhoek">(GMT+02:00) Windhoek</option>
                <option value="Asia/Kuwait">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                <option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                <option value="Africa/Nairobi">(GMT+03:00) Nairobi</option>
                <option value="Asia/Tbilisi">(GMT+03:00) Tbilisi</option>
                <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                <option value="Asia/Muscat">(GMT+04:00) Abu Dhabi, Muscat</option>
                <option value="Asia/Baku">(GMT+04:00) Baku</option>
                <option value="Asia/Yerevan">(GMT+04:00) Yerevan</option>
                <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                <option value="Asia/Yekaterinburg">(GMT+05:00) Yekaterinburg</option>
                <option value="Asia/Karachi">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                <option value="Asia/Calcutta">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                <option value="Asia/Calcutta">(GMT+05:30) Sri Jayawardenapura</option>
                <option value="Asia/Katmandu">(GMT+05:45) Kathmandu</option>
                <option value="Asia/Almaty">(GMT+06:00) Almaty, Novosibirsk</option>
                <option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option>
                <option value="Asia/Rangoon">(GMT+06:30) Yangon (Rangoon)</option>
                <option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                <option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                <option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                <option value="Asia/Kuala_Lumpur">(GMT+08:00) Kuala Lumpur, Singapore</option>
                <option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                <option value="Australia/Perth">(GMT+08:00) Perth</option>
                <option value="Asia/Taipei">(GMT+08:00) Taipei</option>
                <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
                <option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option>
                <option value="Australia/Adelaide">(GMT+09:30) Adelaide</option>
                <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
                <option value="Australia/Brisbane">(GMT+10:00) Brisbane</option>
                <option value="Australia/Canberra">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
                <option value="Pacific/Guam">(GMT+10:00) Guam, Port Moresby</option>
                <option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</option>
                <option value="Asia/Magadan">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                <option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option>
                <option value="Pacific/Fiji">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                <option value="Pacific/Tongatapu">(GMT+13:00) Nuku'alofa</option>
            </select>
           
            <br></br>
            <button className="py-2 px-4 bg-sky-700 text-white rounded hover:bg-sky-800 mr-2" id="event-button"  type="submit">Create Event</button>
            <div id="calendar-complete-msg" className={editCalendarEvent}>
                <h3>Event added!</h3>
                <Link to="/myBookmarks">
                  <button className="py-2 px-4 bg-sky-700 text-white rounded hover:bg-sky-800 mr-2">View My Bookmarks
                  </button>
                </Link>
        </div>
       
        </form>
    </div>
  )
}

export default Calendar