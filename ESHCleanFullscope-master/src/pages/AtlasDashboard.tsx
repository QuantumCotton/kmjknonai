import { useMemo } from 'react';
import { FileIcon, ExternalLink, CheckCircle2, Circle, CalendarClock, DollarSign } from 'lucide-react';
import './dashboard.css';

interface DashboardSection {
  title: string;
  description: string;
  items: Array<{ label: string; href: string; meta?: string }>;
}

type Status = 'todo' | 'inProgress' | 'done';

interface TaskItem {
  id: string;
  label: string;
  status: Status;
  assignee?: string;
  due?: string;
}

const assetSections: DashboardSection[] = [
  {
    title: 'Core Onboarding Forms',
    description: 'Live partner intake packets that already exist on chriscotton.me.',
    items: [
      { label: 'Service Partner Application', href: '/contractor-application-form.html' },
      { label: 'Customer Acquisition Worksheet', href: '/customer-acquisition-form.html' },
      { label: 'Brand Assets & Media Intake', href: '/forms/brand-assets-intake.html', meta: 'Updated handwriting lines' }
    ]
  },
  {
    title: 'Launch & Growth Tools',
    description: 'Campaign worksheets and rollout trackers hosted on the public site.',
    items: [
      { label: 'Growth & Financing Canvas', href: '/forms/growth-and-financing-canvas.html' },
      { label: 'Digital Launch Checklist', href: '/forms/digital-launch-checklist.html' },
      { label: 'Neighborhood & Keyword Mapping', href: '/forms/neighborhood-and-keyword-mapping.html' }
    ]
  }
];

const kmjkMetrics = [
  { label: 'Monthly Ad Budget', value: '$2,500', icon: <DollarSign size={18} /> },
  { label: 'Close Rate Target', value: '28%', icon: <CheckCircle2 size={18} /> },
  { label: 'Next Review Call', value: 'Nov 12, 2025', icon: <CalendarClock size={18} /> }
];

const kmjkTasks: TaskItem[] = [
  {
    id: 'kmjk-001',
    label: 'Publish fall promo landing page',
    status: 'inProgress',
    assignee: 'Atlas Team',
    due: 'Oct 28'
  },
  {
    id: 'kmjk-002',
    label: 'Upload before/after gallery (10 photos)',
    status: 'todo',
    assignee: 'KMJK'
  },
  {
    id: 'kmjk-003',
    label: 'Configure follow-up drip in Atlas',
    status: 'done',
    assignee: 'Atlas Ops'
  },
  {
    id: 'kmjk-004',
    label: 'Reconcile Q3 ad spend vs closed revenue',
    status: 'todo',
    assignee: 'Finance'
  }
];

const statusIcon = {
  todo: <Circle size={18} className="status todo" />,
  inProgress: <Circle size={18} className="status in-progress" />,
  done: <CheckCircle2 size={18} className="status done" />
};

export default function AtlasDashboard() {
  const groupedTasks = useMemo(() => {
    return {
      todo: kmjkTasks.filter(task => task.status === 'todo'),
      inProgress: kmjkTasks.filter(task => task.status === 'inProgress'),
      done: kmjkTasks.filter(task => task.status === 'done')
    };
  }, []);

  return (
    <div className="atlas-dashboard">
      <header className="hero">
        <div className="hero-content">
          <h1>Atlas Control Center</h1>
          <p>Your private link into Elite Service Hub operations. Centralize docs, automate follow-up, and track client progress without exposing the main marketing site.</p>
        </div>
      </header>

      <section className="quick-links">
        {assetSections.map(section => (
          <article key={section.title} className="panel">
            <div className="panel-header">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            <ul>
              {section.items.map(item => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <FileIcon size={18} />
                    <span>{item.label}</span>
                    <ExternalLink size={16} />
                  </a>
                  {item.meta && <span className="meta">{item.meta}</span>}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="kmjk">
        <div className="panel metrics">
          <div className="panel-header">
            <h2>KMJK Live Pulse</h2>
            <p>Snapshot of marketing spend, targets, and upcoming checkpoints.</p>
          </div>
          <div className="metrics-grid">
            {kmjkMetrics.map(metric => (
              <div key={metric.label} className="metric-card">
                <div className="icon">{metric.icon}</div>
                <div>
                  <span className="label">{metric.label}</span>
                  <span className="value">{metric.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel tasks">
          <div className="panel-header">
            <h2>KMJK Task Board</h2>
            <p>Track execution so every deliverable is accounted for.</p>
          </div>
          <div className="task-columns">
            {(['todo', 'inProgress', 'done'] as Status[]).map(column => (
              <div key={column} className={`task-column ${column}`}>
                <h3>
                  {column === 'todo' && 'To Do'}
                  {column === 'inProgress' && 'In Progress'}
                  {column === 'done' && 'Completed'}
                  <span>{groupedTasks[column].length}</span>
                </h3>
                <ul>
                  {groupedTasks[column].map(task => (
                    <li key={task.id}>
                      <div className="task-header">
                        {statusIcon[task.status]}
                        <span>{task.label}</span>
                      </div>
                      <div className="task-meta">
                        {task.assignee && <span>{task.assignee}</span>}
                        {task.due && <span className="due">Due {task.due}</span>}
                      </div>
                    </li>
                  ))}
                  {groupedTasks[column].length === 0 && <p className="empty">No items</p>}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
