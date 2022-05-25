import React, { useState } from 'react';

const PostsFilter = ({ setSearchParams, postQuery, latest }) => {
    const [search, setSearch] = useState(postQuery);
    const [checked, setChecked] = useState(latest);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;

        const query = form.search.value;
        const isLatest = form.latest.checked;

        const params = {};

        if (query.trim().length) {
            params.post = query;
        }

        if (isLatest) {
            params.latest = true;
        }

        setSearchParams(params);
    };
    return (
        <form className="form mx-auto" autoComplete="off" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Searching</legend>
                <input
                    type="search"
                    className="form-control"
                    name="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="mt-10">
                    <label>
                        <input
                            type="checkbox"
                            name="latest"
                            checked={checked}
                            onChange={e => setChecked(e.target.checked)}
                        />
                        &nbsp;New only
                    </label>
                </div>
                <div className="mt-10 text-center">
                    <button type="submit" className="btn btn-dark">
                        Search
                    </button>
                    <button type="reset" onClick={() => setSearchParams({ post: '' })} className="btn btn-danger ml-10">
                        Reset
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default PostsFilter;
