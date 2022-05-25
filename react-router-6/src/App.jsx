import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Spinner from './components/Loaders/Spinner';
import './App.css';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Posts = lazy(() => import('./pages/posts/Posts'));
const Post = lazy(() => import('./pages/posts/Post'));
const CreatePost = lazy(() => import('./pages/posts/CreatePost'));
const EditPost = lazy(() => import('./pages/posts/EditPost'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const RequireAuth = lazy(() => import('./hoc/RequireAuth'));
const AuthProvider = lazy(() => import('./hoc/AuthProvider'));

function App() {
    const location = useLocation();

    return (
        <AuthProvider>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <Home />
                                </Suspense>
                            }
                        />
                        <Route
                            path="about/*"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <About />
                                </Suspense>
                            }
                        >
                            <Route path={'team-again'} element={<p>Our team again</p>} />
                        </Route>
                        <Route
                            path="about-us"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <Navigate to="/about" replace />
                                </Suspense>
                            }
                        />
                        <Route
                            path="posts"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <Posts />
                                </Suspense>
                            }
                        />
                        <Route
                            path="posts/:id"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <Post />
                                </Suspense>
                            }
                        />
                        <Route
                            path="posts/:id/edit"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <EditPost />
                                </Suspense>
                            }
                        />
                        <Route
                            path="posts/new"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <RequireAuth>
                                        <CreatePost />
                                    </RequireAuth>
                                </Suspense>
                            }
                        />
                        <Route
                            path="login"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <Login />
                                </Suspense>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <NotFound />
                                </Suspense>
                            }
                        />
                    </Route>
                </Routes>
            </AnimatePresence>
        </AuthProvider>
    );
}

export default App;
