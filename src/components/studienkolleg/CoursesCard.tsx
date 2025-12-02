import type { CourseType } from '../../data/studienkollegData';

type CoursesCardProps = {
  courses: CourseType[];
};

export function CoursesCard({ courses }: CoursesCardProps) {
  return (
    <div className="bg-surface rounded-[24px] shadow-card p-8 mb-8 border border-[rgba(0,0,0,0.02)]">
      <h2 className="font-serif text-2xl font-bold text-text-main mb-5">
        Academic Tracks
      </h2>
      <p className="text-text-muted leading-relaxed mb-5">
        This institution offers the following specialized courses. All instruction is in
        German.
      </p>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="border border-[rgba(0,0,0,0.05)] rounded-xl p-5 transition-all duration-200 hover:translate-x-1 hover:border-primary hover:bg-[#FFFCFA] flex justify-between items-center"
          >
            <div>
              <strong className="text-text-main font-semibold">{course.code}</strong>
              <span className="block text-sm text-text-muted mt-1">
                {course.description}
              </span>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold bg-accent-light text-text-main">
              {course.subjects}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
