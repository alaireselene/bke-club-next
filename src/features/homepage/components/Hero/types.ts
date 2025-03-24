
type StatLabel = "Câu lạc bộ" | "Thành viên" | "Đối tác" | "Sự kiện";

interface Stat {
  value: string;
  label: StatLabel;
}

interface HeroProps {
  stats: Stat[];
}