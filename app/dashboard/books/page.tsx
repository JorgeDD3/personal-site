"use client";

import { useEffect, useMemo, useState } from "react";

type BookStatus = "Want to Read" | "Reading" | "Finished";

type BookSource =
  | "Bought"
  | "Kindle Unlimited"
  | "Library"
  | "Borrowed"
  | "Gifted"
  | "Other";

type BookEntry = {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  owned: boolean;
  rating: number | "";
  review: string;
  categories: string[];
  source: BookSource;
  startDate: string;
  finishDate: string;
  createdAt: string;
};

const STORAGE_KEY = "gd3-books";

const CATEGORY_OPTIONS = [
  "Fiction",
  "Nonfiction",
  "Self-Help",
  "Business",
  "Philosophy",
  "Psychology",
  "Biography",
  "Finance",
  "Health",
  "Productivity",
  "History",
  "Other",
] as const;

function getDaysToRead(startDate: string, finishDate: string) {
  if (!startDate || !finishDate) return null;

  const start = new Date(startDate);
  const finish = new Date(finishDate);
  const diff = finish.getTime() - start.getTime();

  if (Number.isNaN(diff) || diff < 0) return null;

  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

export default function BooksDashboardPage() {
  const [books, setBooks] = useState<BookEntry[]>(() => {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as BookEntry[];
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<BookStatus>("Want to Read");
  const [rating, setRating] = useState<number | "">("");
  const [review, setReview] = useState("");
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
const [source, setSource] = useState<BookSource>("Bought");
const [owned, setOwned] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
const [statusFilter, setStatusFilter] = useState<"All" | BookStatus>("All");
const [sortBy, setSortBy] = useState<"newest" | "rating" | "finishDate">("newest");
const [viewMode, setViewMode] = useState<"list" | "library">("list");
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
const [editingBookId, setEditingBookId] = useState<string | null>(null);
  



useEffect(() => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}, [books]);

function getRatingStyles(rating: number | "") {
  if (rating === "") {
    return "border-white/10 bg-white/5";
  }

  if (rating >= 9) {
    return "border-emerald-400/30 bg-emerald-500/10";
  }

  if (rating >= 8) {
    return "border-sky-400/30 bg-sky-500/10";
  }

  if (rating >= 7) {
    return "border-yellow-400/30 bg-yellow-500/10";
  }

  if (rating >= 6) {
    return "border-orange-400/30 bg-orange-500/10";
  }

  return "border-red-400/30 bg-red-500/10";
}

const filteredBooks = useMemo(() => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return [...books]
    .filter((book) => {
      if (statusFilter !== "All" && book.status !== statusFilter) {
        return false;
      }

      if (
        selectedCategoryFilter !== "All" &&
        !book.categories.includes(selectedCategoryFilter)
      ) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        book.title,
        book.author,
        book.review,
        book.source,
        ...book.categories,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        const aRating = a.rating === "" ? -1 : a.rating;
        const bRating = b.rating === "" ? -1 : b.rating;
        return bRating - aRating;
      }

      if (sortBy === "finishDate") {
        const aTime = a.finishDate ? new Date(a.finishDate).getTime() : 0;
        const bTime = b.finishDate ? new Date(b.finishDate).getTime() : 0;
        return bTime - aTime;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}, [books, searchQuery, statusFilter, selectedCategoryFilter, sortBy]);
     
const currentlyReadingBooks = useMemo(() => {
  return books.filter((book) => book.status === "Reading");
}, [books]);

const readingQueueBooks = useMemo(() => {
  return books.filter(
    (book) => book.status === "Want to Read" && book.owned
  );
}, [books]);
const stats = useMemo(() => {
  const currentYear = new Date().getFullYear();

  const wantToRead = books.filter((b) => b.status === "Want to Read").length;
  const reading = books.filter((b) => b.status === "Reading").length;
  const finished = books.filter((b) => b.status === "Finished").length;
  const owned = books.filter((b) => b.owned).length;

  const ratedBooks = books.filter(
    (b) => b.status === "Finished" && b.rating !== ""
  );

  const finishedThisYear = books.filter((b) => {
    if (b.status !== "Finished" || !b.finishDate) return false;
    return new Date(b.finishDate).getFullYear() === currentYear;
  }).length;

  const averageRating =
    ratedBooks.length > 0
      ? (
          ratedBooks.reduce((sum, book) => sum + Number(book.rating), 0) /
          ratedBooks.length
        ).toFixed(1)
      : "—";

  return {
    wantToRead,
    reading,
    finished,
    owned,
    finishedThisYear,
    averageRating,
  };
}, [books]);

  function handleAddBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !author.trim()) return;

if ((status === "Reading" || status === "Finished") && !startDate) return;

if (status === "Finished" && !finishDate) return;

const newBook: BookEntry = {
  id: crypto.randomUUID(),
  title: title.trim(),
  author: author.trim(),
  status,
  owned,
  rating: status === "Finished" ? rating : "",
  review: review.trim(),
categories: selectedCategories,
  source,
startDate:
  status === "Reading" && !startDate
    ? new Date().toISOString().slice(0, 10)
    : startDate,
finishDate,
  createdAt: new Date().toISOString(),
};

if (editingBookId) {
  setBooks((prev) =>
    prev.map((book) => (book.id === editingBookId ? { ...newBook, id: editingBookId } : book))
  );
} else {
  setBooks((prev) => [newBook, ...prev]);
}

resetForm();
  }

function handleEditBook(book: BookEntry) {
  setEditingBookId(book.id);
  setTitle(book.title);
  setAuthor(book.author);
  setStatus(book.status);
  setOwned(book.owned);
  setRating(book.rating);
  setReview(book.review);
  setSelectedCategories(book.categories);
  setSource(book.source);
  setStartDate(book.startDate);
  setFinishDate(book.finishDate);
}

function resetFilters() {
  setSearchQuery("");
  setStatusFilter("All");
  setSelectedCategoryFilter("All");
  setSortBy("newest");
  setViewMode("list");
}

function resetForm() {
  setEditingBookId(null);
  setTitle("");
  setAuthor("");
  setStatus("Want to Read");
  setOwned(false);
  setRating("");
  setReview("");
  setSelectedCategories([]);
  setSource("Bought");
  setStartDate("");
  setFinishDate("");
}

  function handleDeleteBook(id: string) {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  }

function handleStatusChange(id: string, nextStatus: BookStatus) {
  setBooks((prev) =>
    prev.map((book) => {
      if (book.id !== id) return book;

      if (nextStatus === "Reading" && !book.startDate) {
        return {
          ...book,
          status: nextStatus,
          startDate: new Date().toISOString().slice(0, 10),
        };
      }

      if (nextStatus === "Finished") {
        return {
          ...book,
          status: nextStatus,
          finishDate:
            book.finishDate ||
            new Date().toISOString().slice(0, 10),
        };
      }

      if (nextStatus === "Want to Read") {
        return {
          ...book,
          status: nextStatus,
          startDate: "",
          finishDate: "",
          rating: "",
        };
      }

      return { ...book, status: nextStatus };
    })
  );
}

  return (
    <main className="h-[calc(100vh-80px)] overflow-y-auto">
      <section className="flex h-full w-full flex-col px-8 py-6">
        <div className="mb-10">
          <p className="text-sm text-gray-500">Private Dashboard / Books</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Books Tracker
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-gray-400">
            Track what you want to read, what you’re reading, and what you’ve
            finished. This version saves in your browser so you can start using
            it tonight.
          </p>
        </div>

<div className="mb-8 grid gap-4 md:grid-cols-6">
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
  <p className="text-xs text-gray-500">Finished This Year</p>
  <p className="mt-2 text-2xl font-semibold">{stats.finishedThisYear}</p>
</div>
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs text-gray-500">Want to Read</p>
    <p className="mt-2 text-2xl font-semibold">{stats.wantToRead}</p>
  </div>
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs text-gray-500">Reading</p>
    <p className="mt-2 text-2xl font-semibold">{stats.reading}</p>
  </div>
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs text-gray-500">Finished</p>
    <p className="mt-2 text-2xl font-semibold">{stats.finished}</p>
  </div>
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs text-gray-500">Owned</p>
    <p className="mt-2 text-2xl font-semibold">{stats.owned}</p>
  </div>
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs text-gray-500">Avg Rating</p>
    <p className="mt-2 text-2xl font-semibold">{stats.averageRating}</p>
  </div>
</div>

        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[520px_minmax(0,1fr)]">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-full">
          <h2 className="text-xl font-semibold">
  {editingBookId ? "Edit Book" : "Add Book"}
</h2>

          <form onSubmit={handleAddBook} className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book title"
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-gray-500"
              />
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-gray-500"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BookStatus)}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none"
              >
                <option>Want to Read</option>
                <option>Reading</option>
                <option>Finished</option>
              </select>

<input
  type="number"
  min="0"
  max="10"
  step="0.1"
  value={status === "Finished" ? rating : ""}
  onChange={(e) =>
    setRating(e.target.value ? Number(e.target.value) : "")
  }
  placeholder={
    status === "Finished" ? "Rating (0–10)" : "Rating available when finished"
  }
  disabled={status !== "Finished"}
  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
/>

              <select
                value={source}
                onChange={(e) => setSource(e.target.value as BookSource)}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none"
              >
                <option>Bought</option>
                <option>Kindle Unlimited</option>
                <option>Library</option>
                <option>Borrowed</option>
                <option>Gifted</option>
                <option>Other</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
<input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  required={status === "Reading" || status === "Finished"}
  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none"
/>

<input
  type="date"
  value={finishDate}
  onChange={(e) => setFinishDate(e.target.value)}
  required={status === "Finished"}
  disabled={status !== "Finished"}
  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
/>
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-300">
  <input
    type="checkbox"
    checked={owned}
    onChange={(e) => setOwned(e.target.checked)}
    className="h-4 w-4"
  />
  I already have this book
</label>

<div className="rounded-xl border border-white/10 bg-black/30 px-4 py-4">
  <p className="mb-3 text-sm text-gray-400">Categories</p>

  <div className="flex flex-wrap gap-2">
    {CATEGORY_OPTIONS.map((category) => {
      const isSelected = selectedCategories.includes(category);

      return (
        <button
          key={category}
          type="button"
          onClick={() =>
            setSelectedCategories((prev) =>
              prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
            )
          }
          className={`rounded-full px-3 py-2 text-xs transition ${
            isSelected
              ? "bg-white text-black"
              : "border border-white/10 text-gray-300 hover:bg-white/10"
          }`}
        >
          {category}
        </button>
      );
    })}
  </div>
</div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Review / thoughts"
              rows={6}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-gray-500"
            />

<div className="flex gap-3">
  <button
    type="submit"
    className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
  >
    {editingBookId ? "Update Book" : "Save Book"}
  </button>

  {editingBookId ? (
    <button
      type="button"
      onClick={resetForm}
      className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10"
    >
      Cancel
    </button>
  ) : null}
</div>
          </form>
        </div>

        <div className="min-h-0 flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden">
  <div className="flex flex-col gap-4">
    <div>
      <h2 className="text-xl font-semibold">Your Books</h2>
      <p className="mt-1 text-xs text-gray-500">{filteredBooks.length} shown</p>
    </div>

   <div className="flex flex-wrap gap-3">
  <input
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search books, authors, categories..."
    className="min-w-[260px] rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm outline-none placeholder:text-gray-500"
  />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as "All" | BookStatus)}
        className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm outline-none"
      >
        <option value="All">All Statuses</option>
        <option value="Want to Read">Want to Read</option>
        <option value="Reading">Reading</option>
        <option value="Finished">Finished</option>
      </select>

<select
  value={selectedCategoryFilter}
  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
  className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm outline-none"
>
  <option value="All">All Categories</option>
  {CATEGORY_OPTIONS.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "newest" | "rating" | "finishDate")
        }
        className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm outline-none"
      >
        <option value="newest">Sort: Newest</option>
        <option value="rating">Sort: Rating</option>
        <option value="finishDate">Sort: Date Read</option>
      </select>

      <div className="flex overflow-hidden rounded-xl border border-white/10">
        <button
          type="button"
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 text-sm transition ${
            viewMode === "list" ? "bg-white text-black" : "bg-black/20 text-gray-300"
          }`}
        >
          List
        </button>
        <button
          type="button"
          onClick={() => setViewMode("library")}
          className={`px-4 py-2 text-sm transition ${
            viewMode === "library"
              ? "bg-white text-black"
              : "bg-black/20 text-gray-300"
          }`}
        >
          Library
        </button>
      </div>
      <button
  type="button"
  onClick={resetFilters}
  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10"
>
  Clear Filters
</button>
    </div>
  </div>

{currentlyReadingBooks.length > 0 ? (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-white">Currently Reading</h3>
      <span className="text-xs text-gray-500">
        {currentlyReadingBooks.length} active
      </span>
    </div>

    <div className="flex flex-wrap gap-3">
      {currentlyReadingBooks.map((book) => (
        <div
          key={`currently-reading-${book.id}`}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        >
          <p className="text-sm font-medium text-white">{book.title}</p>
          <p className="text-xs text-gray-400">{book.author}</p>
          {book.startDate ? (
            <p className="mt-1 text-xs text-gray-500">Started: {book.startDate}</p>
          ) : null}
        </div>
      ))}
    </div>
  </div>
) : null}

{readingQueueBooks.length > 0 ? (
  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-white">Reading Queue</h3>
      <span className="text-xs text-gray-500">
        {readingQueueBooks.length} ready to start
      </span>
    </div>

    <div className="flex flex-wrap gap-3">
      {readingQueueBooks.map((book) => (
        <div
          key={`reading-queue-${book.id}`}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        >
          <p className="text-sm font-medium text-white">{book.title}</p>
          <p className="text-xs text-gray-400">{book.author}</p>
        </div>
      ))}
    </div>
  </div>
) : null}

{filteredBooks.length === 0 ? (
    <p className="mt-6 text-sm text-gray-400">
      No books match this view yet.
    </p>
  ) : viewMode === "list" ? (
    <div className="mt-6 max-h-full overflow-y-auto pr-2 flex flex-col gap-4">
      {filteredBooks.map((book) => {
        const daysToRead = getDaysToRead(book.startDate, book.finishDate);

        return (
          <div
            key={book.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-400">{book.author}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-gray-300">
                    {book.status}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-gray-300">
                    Rating: {book.rating === "" ? "—" : `${book.rating}/10`}
                  </span>
<span className="rounded-full border border-white/10 px-3 py-1 text-gray-300">
  Source: {book.source}
</span>
<span className="rounded-full border border-white/10 px-3 py-1 text-gray-300">
  {book.owned ? "Owned" : "Not owned yet"}
</span>
                  {book.finishDate ? (
                    <span className="rounded-full border border-white/10 px-3 py-1 text-gray-300">
                      Finished: {book.finishDate}
                    </span>
                  ) : null}
                  {daysToRead !== null ? (
                    <span className="rounded-full border border-white/10 px-3 py-1 text-gray-300">
                      Days: {daysToRead}
                    </span>
                  ) : null}
                </div>

                {book.categories.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {book.categories.map((category) => (
                      <span
                        key={`${book.id}-${category}`}
                        className="rounded-full bg-white/10 px-3 py-1 text-gray-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                ) : null}

                {book.review ? (
                  <p className="mt-4 whitespace-pre-wrap text-sm text-gray-400">
                    {book.review}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange(book.id, "Want to Read")}
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  Want
                </button>
                <button
                  onClick={() => handleStatusChange(book.id, "Reading")}
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  Reading
                </button>
                <button
                  onClick={() => handleStatusChange(book.id, "Finished")}
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  Finished
                </button>
<button
  onClick={() => handleEditBook(book)}
  className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:bg-white/10"
>
  Edit
</button>
<button
  onClick={() => handleDeleteBook(book.id)}
  className="rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/10"
>
  Delete
</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="mt-6 max-h-full overflow-y-auto pr-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {filteredBooks.map((book) => (
        <div
          key={book.id}
          className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] ${getRatingStyles(
            book.rating
          )}`}
          title={book.review || "No review yet"}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">{book.title}</h3>
              <p className="mt-1 text-sm text-gray-300">{book.author}</p>
            </div>
            <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-gray-200">
              {book.rating === "" ? "—" : book.rating}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-white/10 px-2 py-1 text-gray-200">
              {book.status}
            </span>
            <span className="rounded-full border border-white/10 px-2 py-1 text-gray-200">
              {book.source}
            </span>
          </div>

          {book.categories.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {book.categories.slice(0, 3).map((category) => (
                <span
                  key={`${book.id}-library-${category}`}
                  className="rounded-full bg-black/20 px-2 py-1 text-gray-200"
                >
                  {category}
                </span>
              ))}
            </div>
          ) : null}

          <p className="mt-4 line-clamp-4 text-sm text-gray-200 opacity-80 transition group-hover:opacity-100">
            {book.review || "No review yet."}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
        </div>
      </section>
    </main>
  );
}