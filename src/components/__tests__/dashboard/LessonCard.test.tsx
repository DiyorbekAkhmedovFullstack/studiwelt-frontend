import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { LessonCard } from '../../dashboard/LessonCard';
import { renderWithRouter } from '../../../test/utils';

describe('LessonCard', () => {
  it('should render lesson number and title', () => {
    renderWithRouter(
      <LessonCard lessonNumber={1} title="Introduction to German" state="active" />
    );

    expect(screen.getByText('Day 01')).toBeInTheDocument();
    expect(screen.getByText('Introduction to German')).toBeInTheDocument();
  });

  it('should show "Resume Lesson" for active state', () => {
    renderWithRouter(
      <LessonCard lessonNumber={1} title="Lesson 1" state="active" />
    );

    expect(screen.getByText('Resume Lesson')).toBeInTheDocument();
  });

  it('should apply locked styles with reduced opacity', () => {
    const { container } = renderWithRouter(
      <LessonCard lessonNumber={5} title="Advanced Grammar" state="locked" />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('opacity-60');
  });

  it('should render as Link when not locked and has `to` prop', () => {
    renderWithRouter(
      <LessonCard lessonNumber={1} title="Lesson 1" state="active" to="/course/1" />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/course/1');
  });

  it('should render as div when locked', () => {
    renderWithRouter(
      <LessonCard lessonNumber={5} title="Lesson 5" state="locked" to="/course/5" />
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should display duration when provided', () => {
    renderWithRouter(
      <LessonCard lessonNumber={1} title="Lesson 1" state="completed" duration="2/4 sections" />
    );

    expect(screen.getByText('2/4 sections')).toBeInTheDocument();
  });

  it('should display type when provided', () => {
    renderWithRouter(
      <LessonCard lessonNumber={1} title="Lesson 1" state="completed" type="Grammar" />
    );

    expect(screen.getByText('Grammar')).toBeInTheDocument();
  });

  it('should apply completed styles with strikethrough', () => {
    renderWithRouter(
      <LessonCard lessonNumber={1} title="Completed Lesson" state="completed" />
    );

    const title = screen.getByText('Completed Lesson');
    expect(title).toHaveClass('line-through');
  });

  it('should apply active styles', () => {
    renderWithRouter(
      <LessonCard lessonNumber={1} title="Active Lesson" state="active" />
    );

    const title = screen.getByText('Active Lesson');
    expect(title).toHaveClass('text-primary');
  });

  it('should format lesson number with leading zero', () => {
    renderWithRouter(
      <LessonCard lessonNumber={3} title="Lesson 3" state="active" />
    );

    expect(screen.getByText('Day 03')).toBeInTheDocument();
  });

  it('should not add leading zero for double digit numbers', () => {
    renderWithRouter(
      <LessonCard lessonNumber={15} title="Lesson 15" state="active" />
    );

    expect(screen.getByText('Day 15')).toBeInTheDocument();
  });
});
