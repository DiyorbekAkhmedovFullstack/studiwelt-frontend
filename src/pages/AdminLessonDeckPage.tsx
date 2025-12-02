import { useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lessonService, type LessonResponse } from '../services/lessonService';
import { deckService } from '../services/deckService';
import type { Deck } from '../types/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import { CSVUploadForm } from '../components/lesson/CSVUploadForm';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

type Params = {
  lessonNumber?: string;
};

export function AdminLessonDeckPage() {
  const { lessonNumber } = useParams<Params>();

  const [lesson, setLesson] = useState<LessonResponse['lesson'] | null>(null);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createDescription, setCreateDescription] = useState('');

  const [editingDeck, setEditingDeck] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [savingCard, setSavingCard] = useState(false);

  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editCardFront, setEditCardFront] = useState('');
  const [editCardBack, setEditCardBack] = useState('');

  useEffect(() => {
    if (!lessonNumber) {
      setError('Lesson number is missing.');
      setLoading(false);
      return;
    }

    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const lessonData = await lessonService.getLessonByNumber(lessonNumber);
        if (!active) return;

        setLesson(lessonData.lesson);

        const decksData = await deckService.getDecksByLessonId(lessonData.lesson.id);
        if (!active) return;

        // There should be at most one deck per lesson. If multiple exist, use the first.
        setDeck(decksData.decks[0] ?? null);
      } catch (err) {
        if (!active) return;
        const message =
          err instanceof Error
            ? err.message
            : 'Load failed.';
        setError(message);
        toastService.error('Load failed.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [lessonNumber]);

  const handleCreateDeck = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lesson) return;
    if (!createName.trim()) {
      toastService.error('Deck name cannot be empty.');
      return;
    }

    setCreating(true);
    try {
      const { deck: created } = await deckService.createDeck({
        name: createName.trim(),
        description: createDescription.trim(),
        lessonId: lesson.id,
      });
      setDeck(created);
      setCreateName('');
      setCreateDescription('');
      toastService.success('Deck created successfully.');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create deck.';
      setError(message);
      toastService.error('Failed to create deck. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const beginEditDeck = () => {
    if (!deck) return;
    setEditingDeck(true);
    setEditName(deck.name);
    setEditDescription(deck.description ?? '');
  };

  const cancelEditDeck = () => {
    setEditingDeck(false);
    setEditName('');
    setEditDescription('');
  };

  const saveDeck = async () => {
    if (!lesson || !deck) return;
    if (!editName.trim()) {
      toastService.error('Deck name cannot be empty.');
      return;
    }

    try {
      const { deck: updated } = await deckService.updateDeck(deck.id, {
        name: editName.trim(),
        description: editDescription.trim(),
        lessonId: lesson.id,
      });
      setDeck(updated);
      toastService.success('Deck updated.');
      cancelEditDeck();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update deck.';
      setError(message);
      toastService.error('Failed to update deck. Please try again.');
    }
  };

  const handleAddCard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!deck) return;
    if (!cardFront.trim() || !cardBack.trim()) {
      toastService.error('Both front and back are required.');
      return;
    }

    setSavingCard(true);
    try {
      const { card } = await deckService.addCard(deck.id, {
        front: cardFront.trim(),
        back: cardBack.trim(),
      });
      setDeck({
        ...deck,
        cards: [...deck.cards, card],
      });
      setCardFront('');
      setCardBack('');
      toastService.success('Card added.');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to add card.';
      setError(message);
      toastService.error('Failed to add card. Please try again.');
    } finally {
      setSavingCard(false);
    }
  };

  const beginEditCard = (cardId: string, front: string, back: string) => {
    setEditingCardId(cardId);
    setEditCardFront(front);
    setEditCardBack(back);
  };

  const cancelEditCard = () => {
    setEditingCardId(null);
    setEditCardFront('');
    setEditCardBack('');
  };

  const saveCard = async (cardId: string) => {
    if (!deck) return;
    if (!editCardFront.trim() || !editCardBack.trim()) {
      toastService.error('Both front and back are required.');
      return;
    }

    setSavingCard(true);
    try {
      const { card: updated } = await deckService.updateCard(cardId, {
        front: editCardFront.trim(),
        back: editCardBack.trim(),
      });
      setDeck({
        ...deck,
        cards: deck.cards.map((card) =>
          card.id === updated.id ? { ...card, ...updated } : card,
        ),
      });
      toastService.success('Card updated.');
      cancelEditCard();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update card.';
      setError(message);
      toastService.error('Failed to update card. Please try again.');
    } finally {
      setSavingCard(false);
    }
  };

  const deleteCard = async (cardId: string) => {
    if (!deck) return;
    if (!window.confirm('Delete this card? This action cannot be undone.')) {
      return;
    }
    try {
      await deckService.deleteCard(cardId);
      setDeck({
        ...deck,
        cards: deck.cards.filter((card) => card.id !== cardId),
      });
      toastService.success('Card deleted.');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete card.';
      setError(message);
      toastService.error('Failed to delete card. Please try again.');
    }
  };

  const handleUploadSuccess = async () => {
    if (!lesson) return;
    try {
      const decksData = await deckService.getDecksByLessonId(lesson.id);
      setDeck(decksData.decks[0] ?? null);
    } catch (err) {
      console.error('Failed to reload deck after upload:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
          <p className="mb-4 text-[15px] text-danger" role="alert">
            {error ?? 'Lesson not found.'}
          </p>
          <Link
            to="/admin/lessons"
            className="inline-block rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Back to admin lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <Link
            to={`/admin/lessons/${lesson.lessonNumber}`}
            className="flex items-center gap-2 text-text-muted text-[14px] font-medium mb-6 hover:text-text-main transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Lesson Detail
          </Link>
          <p className="text-[13px] uppercase tracking-wider text-text-muted font-semibold mb-2">
            Day {lesson.lessonNumber} – Flashcard Deck
          </p>
          <h1 className="text-[2rem] font-serif font-bold text-text-main">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="mt-2 text-[15px] text-text-muted leading-relaxed max-w-[600px]">
              {lesson.description}
            </p>
          )}
        </header>

        {!deck ? (
          <div className="bg-surface rounded-[24px] p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
            <h2 className="text-[1.2rem] font-serif font-bold text-text-main mb-2">Create Deck</h2>
            <p className="text-[15px] text-text-muted mb-6">
              This lesson does not have a flashcard deck yet. Create one deck for this lesson's topic.
            </p>
            <form onSubmit={handleCreateDeck} className="space-y-4">
              <div>
                <label className="mb-2 block text-[14px] font-medium text-text-main">
                  Deck Name *
                </label>
                <input
                  type="text"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., Basic German Vocabulary"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-text-main">
                  Description
                </label>
                <textarea
                  value={createDescription}
                  onChange={(e) => setCreateDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Optional description of the deck content"
                />
              </div>
              <button
                type="submit"
                disabled={creating}
                className="rounded-lg bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
              >
                {creating ? 'Creating…' : 'Create Deck'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Deck Details */}
            <div className="bg-surface rounded-[24px] p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-[1.2rem] font-serif font-bold text-text-main">Deck Details</h2>
                <div className="flex gap-2">
                  {editingDeck ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          void saveDeck();
                        }}
                        className="rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-white hover:bg-primary-hover transition-colors"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditDeck}
                        className="rounded-lg border border-border-soft px-4 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={beginEditDeck}
                      className="rounded-lg border border-border-soft px-4 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                    >
                      Edit Deck
                    </button>
                  )}
                </div>
              </div>
              {editingDeck ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-text-main">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-text-main">
                      Description
                    </label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[16px] font-medium text-text-main">{deck.name}</p>
                  {deck.description && (
                    <p className="mt-2 text-[15px] text-text-muted">
                      {deck.description}
                    </p>
                  )}
                  <p className="mt-3 text-[14px] text-text-muted">
                    {deck.cards.length} card{deck.cards.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Cards Section */}
            <div className="bg-surface rounded-[24px] p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
              <h2 className="text-[1.2rem] font-serif font-bold text-text-main mb-2">Flashcards</h2>
              <p className="text-[15px] text-text-muted mb-6">
                Add and edit flashcards for this lesson. Each card has a front (prompt) and back (answer).
              </p>

              {/* Add Card Form */}
              <form onSubmit={handleAddCard} className="mb-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                <div>
                  <label className="mb-2 block text-[14px] font-medium text-text-main">
                    Front
                  </label>
                  <textarea
                    value={cardFront}
                    onChange={(e) => setCardFront(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., What is 'hello' in German?"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[14px] font-medium text-text-main">
                    Back
                  </label>
                  <textarea
                    value={cardBack}
                    onChange={(e) => setCardBack(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., Hallo"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={savingCard}
                    className="w-full md:w-auto whitespace-nowrap rounded-lg bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
                  >
                    {savingCard ? 'Adding…' : 'Add Card'}
                  </button>
                </div>
              </form>

              {/* Cards Table */}
              <div className="overflow-hidden rounded-xl border border-[rgba(0,0,0,0.05)]">
                {deck.cards.length === 0 ? (
                  <p className="px-6 py-8 text-center text-[15px] text-text-muted">
                    No cards yet. Use the form above to add the first card.
                  </p>
                ) : (
                  <table className="min-w-full text-left">
                    <thead className="bg-highlight">
                      <tr>
                        <th className="px-6 py-4 text-[13px] font-semibold text-text-main">Front</th>
                        <th className="px-6 py-4 text-[13px] font-semibold text-text-main">Back</th>
                        <th className="px-6 py-4 text-[13px] font-semibold text-text-main text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deck.cards.map((card) => {
                        const isEditing = editingCardId === card.id;
                        return (
                          <tr key={card.id} className="border-t border-[rgba(0,0,0,0.05)]">
                            <td className="px-6 py-4 align-top">
                              {isEditing ? (
                                <textarea
                                  value={editCardFront}
                                  onChange={(e) => setEditCardFront(e.target.value)}
                                  rows={2}
                                  className="w-full rounded-lg border border-border-soft px-3 py-2 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                              ) : (
                                <p className="whitespace-pre-wrap text-[14px] text-text-main">
                                  {card.front}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4 align-top">
                              {isEditing ? (
                                <textarea
                                  value={editCardBack}
                                  onChange={(e) => setEditCardBack(e.target.value)}
                                  rows={2}
                                  className="w-full rounded-lg border border-border-soft px-3 py-2 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                              ) : (
                                <p className="whitespace-pre-wrap text-[14px] text-text-main">
                                  {card.back}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4 align-top text-right">
                              <div className="flex justify-end gap-2">
                                {isEditing ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        void saveCard(card.id);
                                      }}
                                      disabled={savingCard}
                                      className="rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={cancelEditCard}
                                      className="rounded-lg border border-border-soft px-4 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      beginEditCard(card.id, card.front, card.back)
                                    }
                                    className="rounded-lg border border-border-soft px-4 py-2 text-[13px] font-semibold text-text-main hover:bg-highlight transition-colors"
                                  >
                                    Edit
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    void deleteCard(card.id);
                                  }}
                                  className="rounded-lg bg-danger px-4 py-2 text-[13px] font-semibold text-white hover:bg-danger/90 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* CSV Upload Section */}
            <CSVUploadForm deckId={deck.id} onUploadSuccess={handleUploadSuccess} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
