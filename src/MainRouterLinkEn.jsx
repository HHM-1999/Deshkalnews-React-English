import { Route, Routes } from "react-router-dom";
import About from './ComponentEn/About';
import AdvertisementPage from './ComponentEn/AdvertisementPage';
import ArchivesEn from "./ComponentEn/ArchivesEn";
import Category from './ComponentEn/CategoryEn/Category';
import ContactPage from './ComponentEn/ContactPage';
import Details from "./ComponentEn/DetailsEnPage/Details";
import ErrorPageEn from './ComponentEn/ErrorPageEn';
import FooterEn from './ComponentEn/FooterEn';
import HeaderEn from './ComponentEn/HeaderEn';
import HomeEn from './ComponentEn/HomeEn';
import Latest from './ComponentEn/Latest';
import DetailsPhotoFeature from './ComponentEn/Photo-features/DetailsPhotoFeature';
import PhotoGallery from './ComponentEn/Photo-features/PhotoGallery';
import PrivacyPolicy from './ComponentEn/Privacy-policy';
import SearchResult from './ComponentEn/SearchResult';
import SubCategory from './ComponentEn/SubCategoryEn/SubcategorySlug';
import AllTagList from './ComponentEn/TagsEn/AllTagList';
import TagPage from './ComponentEn/TagsEn/TagPage';
import Terms from './ComponentEn/Terms';
import AllWriters from './ComponentEn/WritersEn/AllWriters';
import WritersPage from './ComponentEn/WritersEn/WritersPage';
import './EMythMakersEn.css';


export default function MainRouterLinkEn() {
    return (
        <div className="eng-site">
            <HeaderEn />
            <Routes>
                <Route path="/" element={<HomeEn />} />
                <Route path="/archives" element={<ArchivesEn />} />
                <Route path="/details/:catSlugEn/:id" element={<Details />} />
                <Route path="/*" element={<ErrorPageEn />} />
                <Route path="/search/:searchSlug" element={<SearchResult />} />
                <Route path="/latest" element={<Latest />} />
                <Route path="/:catSlugEn" element={<Category />} />
                <Route path="/:catSlugEn/:subCatSlug" element={<SubCategory />} />
                <Route path="/photo/" element={<PhotoGallery />} />
                <Route path="/photo/:AlbumID" element={<DetailsPhotoFeature />} />
                <Route path="/tags/:TagTitle" element={<TagPage />} />
                <Route path="/tags" element={<AllTagList />} />
                <Route path="/writers/:WriterSlug" element={<WritersPage />} />
                <Route path="/writers" element={<AllWriters />} />
                <Route path='/terms-conditions' element={<Terms />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/contact-us' element={<ContactPage />} />
                <Route path="/about" element={<About />} />
                <Route path='/advertise' element={<AdvertisementPage />} />
            </Routes>
            <FooterEn />
        </div>


    )
}