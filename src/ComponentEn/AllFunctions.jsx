function ForLazyLoaderImg(lazyloaded) {
    if (!lazyloaded) {
        var images = document.querySelectorAll('.DImgZoomBlock picture img')
        var images2 = document.querySelectorAll('div.Imgresize img')
        var images3 = document.querySelectorAll('.DTopImg img.img-fluid.img100')
        var images4 = document.querySelectorAll('.DetailsPF img')
        let imageOptions = {}
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const image = entry.target
                // console.log(image);
                const newURL = image.getAttribute('data-src')
                image.src = newURL
                observer.unobserve(image)
            })
        }, imageOptions)
        images.forEach((image) => {
            observer.observe(image)
        })
        images2.forEach((image) => {
            observer.observe(image)
        })
        images3.forEach((image) => {
            observer.observe(image)
        })
        images4.forEach((image) => {
            observer.observe(image)
        })
        lazyloaded = true
    }
}


const scrollTop = (e) => {
    if (!e.ctrlKey) {
        setTimeout(function () {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, 100);
    }
};


const getTimeDistance = (date) => {
    // console.log(date);
    let publishDateTime = date.replace(/-/g, '/');
    let publishTime = new Date(publishDateTime);
    let now = new Date();
    var diff = new Date(now - publishTime);
    var days = parseInt(diff / 1000 / 60 / 60 / 24);
    var hours = parseInt(diff / 1000 / 60 / 60);
    var minutes = parseInt(diff / 1000 / 60);
    var seconds = parseInt(diff / 1000);
    if (days >= 1) {
        days = banglaDateConvetar(days.toString())
        return days + ' দিন আগে';
    }
    else if (hours >= 1) {
        hours = banglaDateConvetar(hours.toString())
        return hours + ' ঘন্টা আগে';
    }
    else if (minutes >= 1) {
        minutes = banglaDateConvetar(minutes.toString())
        return minutes + ' মিনিট আগে';
    }
    else {
        seconds = banglaDateConvetar(seconds.toString())
        return seconds + ' সেকেন্ড আগে';
    }
}
function formatDateToBengali(dateStr) {
   
    const monthsBengali = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];

   
    const daysBengali = [
        'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার',
        'শুক্রবার', 'শনিবার'
    ];

    
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];


    function toBengaliDigits(num) {
        return num.toString().split('').map(digit => bengaliDigits[parseInt(digit)]).join('');
    }

 
    const date = new Date(dateStr);

   
    const dayOfWeek = daysBengali[date.getDay()];
    const dayOfMonth = toBengaliDigits(date.getDate());
    const month = monthsBengali[date.getMonth()];
    const year = toBengaliDigits(date.getFullYear());
    
   
    let hours = date.getHours();
    let minutes = date.getMinutes();

    
    // const period = hours >= 12 ? 'বিকেল' : 'সকাল';
    hours = hours % 12;
    hours = hours ? hours : 12;  // Convert 0 to 12
    minutes = toBengaliDigits(minutes < 10 ? '0' + minutes : minutes);

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}, ${toBengaliDigits(hours)}:${minutes} `;
    return formattedDate;
}
function formatDateToBengali24(dateStr) {
    const monthsBengali = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];

    const daysBengali = [
        'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার',
        'শুক্রবার', 'শনিবার'
    ];

    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    function toBengaliDigits(num) {
        return num.toString().split('').map(digit => bengaliDigits[parseInt(digit)]).join('');
    }

    const date = new Date(dateStr);

    const dayOfWeek = daysBengali[date.getDay()];
    const dayOfMonth = toBengaliDigits(date.getDate());
    const month = monthsBengali[date.getMonth()];
    const year = toBengaliDigits(date.getFullYear());

    let hours = toBengaliDigits(String(date.getHours()).padStart(2, '0')); // 24-hour format
    let minutes = toBengaliDigits(String(date.getMinutes()).padStart(2, '0'));

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}, ${hours}:${minutes}`;
    return formattedDate;
}

function banglaDateConvetar(engDate) {
    var mapObj = {
        1: "১",
        2: "২",
        3: "৩",
        4: "৪",
        5: "৫",
        6: "৬",
        7: "৭",
        8: "৮",
        9: "৯",
        0: "০",
        January: "জানুয়ারি",
        February: "ফেব্রুয়ারি",
        March: "মার্চ",
        April: "এপ্রিল",
        May: "মে",
        June: "জুন",
        July: "জুলাই",
        August: "আগস্ট",
        September: "সেপ্টেম্বর",
        October: "অক্টোবর",
        November: "নভেম্বর",
        December: "ডিসেম্বর",
        am: "সকাল",
        pm: "দুপুর",
        Saturday: "শনিবার",
        Sunday: "রবিবার",
        Monday: "সোমবার",
        Tuesday: "মঙ্গলবার",
        Wednesday: "বুধবার",
        Thursday: "বৃহস্পতিবার",
        Friday: "শুক্রবার",
        'جمادى الأولى': "জামাদিউল আউয়াল",
        'جمادى الآخرة': "জামাদিউছ ছানি",
        'رجب': "রজব",
        'شعبان': "শা’বান",
        'رمضان': "রমজান",
        'شوال': "শাওয়াল",
        'ذو القعدة': "জুল কাইদাহ",
        'ذو الحجة': "জুল হিজ্জাহ",
        'محرم ': "মুহররম ",
        'صفر': "সফর",
        'ربيع الأول': "রবিউল আউয়াল",
        'ربيع الثاني': "রবিউছ ছানি",
    };
    let replaceString = /1|2|3|4|5|6|7|8|9|0|January|February|March|April|May|June|July|August|September|October|November|December|am|pm|Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|جمادى الأولى|جمادى الآخرة|رجب|شعبان|رمضان|شوال|ذو القعدة|ذو الحجة|محرم |ربيع الأول|صفر|ربيع الثاني/gi;
    engDate = engDate.replace(replaceString, function (matched) {
        return mapObj[matched];
    });
    return (engDate)
}
const getTimeDistanceEn = (date) => {
    const publishTime = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - publishTime) / 1000);

    const seconds = diffInSeconds % 60;
    // console.log("seconds = ", seconds)
    const minutes = Math.floor(diffInSeconds / 60) % 60;
    const hours = Math.floor(diffInSeconds / 3600) % 24;
    const days = Math.floor(diffInSeconds / 86400);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } 
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } 
    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } 
    if (seconds > 0) {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    return "Just now";
};
function formatTimestamp(timestamp) {
    const dateObj = new Date(timestamp);
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    
    return `${hours}:${minutes}, ${day} ${month} ${year}`;
}
// function convertToBSTISOString(utcTimestamp) {
//     const dateObj = new Date(utcTimestamp);

//     // Add 6 hours for BST (UTC+6)
//     dateObj.setHours(dateObj.getHours() + 6);

//     const year = dateObj.getFullYear();
//     const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//     const day = String(dateObj.getDate()).padStart(2, '0');
//     const hours = String(dateObj.getHours()).padStart(2, '0');
//     const minutes = String(dateObj.getMinutes()).padStart(2, '0');
//     const seconds = String(dateObj.getSeconds()).padStart(2, '0');

//     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+06:00`;
// }

// function timeAgo(isoDate) {
//     const date = new Date(isoDate);
//     const now = new Date();

//     const diffInMs = now - date; 

//     const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); 

//     if (diffInHours < 1) {
//         const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
//         return diffInMinutes <= 1 ? "just now" : `${diffInMinutes} minutes ago`;
//     } 
//     return `${diffInHours} hours ago`;
// }

function convertToBSTISOString(utcTimestamp) {
    // Defensive: handle undefined/null
    if (utcTimestamp === undefined || utcTimestamp === null) {
      console.warn('convertToBSTISOString called with', utcTimestamp);
      return null; // change to '' if you prefer empty string instead of null
    }
  
    // If input is already a Date
    let dateObj;
    if (utcTimestamp instanceof Date) {
      dateObj = utcTimestamp;
    } else {
      // coerce to string and trim
      let ts = String(utcTimestamp).trim();
      if (!ts) {
        console.warn('convertToBSTISOString: empty timestamp string');
        return null;
      }
  
      // 1) Remove fractional seconds (microseconds) only when followed by Z or timezone or end
      ts = ts.replace(/(\.\d+)(?=(Z|[+-]\d{2}:?\d{2}|$))/,'');
      // 2) Normalize timezone like +0600 -> +06:00
      ts = ts.replace(/([+-]\d{2})(\d{2})$/,'$1:$2');
      // 3) If there's no timezone marker, assume it's UTC and append Z
      if (!/[Zz]|[+-]\d{2}:\d{2}$/.test(ts)) ts += 'Z';
  
      dateObj = new Date(ts);
    }
  
    // Invalid date guard
    if (isNaN(dateObj.getTime())) {
      console.warn('convertToBSTISOString: invalid date after parsing ->', utcTimestamp);
      return null;
    }
  
    // Use Intl to get Asia/Dhaka parts; fallback uses manual +6h adjustment if needed
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  
    const parts = formatter.formatToParts(dateObj);
    const get = (type) => (parts.find(p => p.type === type) || {}).value || null;
  
    // fallback: add +6 hours to UTC milliseconds and read UTC fields from that shifted date
    const fallbackDhaka = new Date(dateObj.getTime() + 6 * 60 * 60 * 1000);
  
    const year = get('year') || String(fallbackDhaka.getUTCFullYear());
    const month = get('month') || String(fallbackDhaka.getUTCMonth() + 1).padStart(2, '0');
    const day = get('day') || String(fallbackDhaka.getUTCDate()).padStart(2, '0');
    const hours = get('hour') || String(fallbackDhaka.getUTCHours()).padStart(2, '0');
    const minutes = get('minute') || String(fallbackDhaka.getUTCMinutes()).padStart(2, '0');
    const seconds = get('second') || String(fallbackDhaka.getUTCSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+06:00`;
  }
  





function timeAgo(earlier, later = new Date()) {
    // Parse both as UTC timestamps
    const t1 = Date.parse(earlier);
    const t2 = Date.parse(later);
  
    // Shift into Bangladesh (UTC+6) by adding 6h
    const BD_OFFSET_MS = 6 * 60 * 60 * 1000;
    let delta = (t2 + BD_OFFSET_MS) - (t1);
  
    if (delta < 0) delta = 0;
  
    // Define units
    const MS = {
      day:    24 * 60 * 60 * 1000,
      hour:   60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000,
    };
  
    // Pick the largest whole unit
    for (const [unit, msPer] of Object.entries(MS)) {
      const amount = Math.floor(delta / msPer);
      if (amount > 0) {
        return amount === 1
          ? `1 ${unit} ago`
          : `${amount} ${unit}s ago`;
      }
    }
  
    return "just now";
  }
  
export {
    ForLazyLoaderImg,
    scrollTop,
    getTimeDistance,
    banglaDateConvetar,
    formatDateToBengali,
    formatDateToBengali24,
    getTimeDistanceEn,
    formatTimestamp,
    timeAgo,
    convertToBSTISOString}
