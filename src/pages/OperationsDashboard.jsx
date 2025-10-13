import { useMemo, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Mic,
  UploadCloud,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const accounts = [
  {
    id: 'josue',
    name: 'Josue Lopez',
    title: 'Project Director',
    email: 'josue@kmjkrenovations.com',
    phone: '555-0112',
    password: 'Cotton247',
    accent: 'from-sky-500 via-blue-500 to-indigo-600',
  },
  {
    id: 'chris',
    name: 'Chris Cotton',
    title: 'Owner / Field Operations',
    email: 'chris@theeliteservicehub.com',
    phone: '650-501-7659',
    password: 'C0tt0n247',
    accent: 'from-amber-500 via-orange-500 to-rose-500',
  },
]

const projectSeeds = [
  {
    id: 'marquez-suite',
    name: 'Marquez Primary Suite',
    client: 'Marquez Family',
    status: 'Rough-in walkthrough scheduled',
    due: 'Oct 12',
    tags: ['bathroom', 'millwork'],
    updates: [
      {
        id: 'update-1',
        author: 'Josue Lopez',
        authorId: 'josue',
        body: 'Municipal inspections cleared. Hostway can begin closing walls after electrical touch ups.',
        createdAt: '2025-10-07T10:22:00Z',
      },
      {
        id: 'update-2',
        author: 'Chris Cotton',
        authorId: 'chris',
        body: 'Framing punch list complete. Uploaded photo set to shared drive for review.',
        createdAt: '2025-10-06T20:54:00Z',
      },
    ],
    notes: [
      {
        id: 'note-1',
        text: 'Client approved the brushed brass plumbing trim. Release purchase order.',
        attachments: [],
        createdAt: '2025-10-05T17:30:00Z',
        client: 'Marquez Family',
        notify: ['josue'],
        status: 'organized',
        summary: 'Client: Marquez Family\nNo attachments.\nNext steps: release brass trim purchase order.',
      },
    ],
  },
  {
    id: 'fitzgerald-kitchen',
    name: 'Fitzgerald Kitchen Refresh',
    client: 'Fitzgerald Residence',
    status: 'Awaiting countertop template',
    due: 'Oct 21',
    tags: ['kitchen'],
    updates: [
      {
        id: 'update-3',
        author: 'Chris Cotton',
        authorId: 'chris',
        body: 'Demo complete. Need confirmation on island outlet layout before Friday.',
        createdAt: '2025-10-07T14:10:00Z',
      },
    ],
    notes: [],
  },
]

const attachmentTypes = [
  { id: 'image', label: 'Image', icon: ImageIcon },
  { id: 'audio', label: 'Audio', icon: Mic },
  { id: 'document', label: 'Document', icon: FileText },
]

const recipients = [
  { id: 'josue', label: 'Email Josue' },
  { id: 'chris', label: 'Email Chris' },
]

const keywordClientMap = [
  { token: 'marquez', client: 'Marquez Family' },
  { token: 'fitzgerald', client: 'Fitzgerald Residence' },
  { token: 'hostway', client: 'KMJK Field Ops' },
]

const keywordActions = [
  { token: 'screw', message: 'Flag hardware change for carpentry team.' },
  { token: 'nail', message: 'Confirm fastener schedule with structural lead.' },
  { token: 'pvc', message: 'Check plumbing materials inventory for PVC fittings.' },
  { token: 'outlet', message: 'Coordinate electrical layout update.' },
]

function formatDate(input) {
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return 'Just now'
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

function analyseNote({ text, attachments, client, notify }) {
  const lower = text.toLowerCase()
  let resolvedClient = client?.trim() || ''

  if (!resolvedClient) {
    const match = keywordClientMap.find((entry) => lower.includes(entry.token))
    if (match) resolvedClient = match.client
  }

  const actionItems = keywordActions
    .filter((entry) => lower.includes(entry.token))
    .map((entry) => entry.message)

  if (!actionItems.length) {
    actionItems.push('Review with project lead and post to daily brief.')
  }

  const autoNotify = [...notify]
  if (!autoNotify.includes('chris') && lower.includes('chris')) autoNotify.push('chris')
  if (!autoNotify.includes('josue') && lower.includes('josue')) autoNotify.push('josue')
  if (!autoNotify.includes('chris') && lower.includes('hostway')) autoNotify.push('chris')

  const summary = [
    `Client: ${resolvedClient || 'Needs routing'}`,
    `${attachments.length ? `${attachments.length} attachment${attachments.length === 1 ? '' : 's'}` : 'No attachments'}.`,
    `Next steps: ${actionItems.join(' ')}`,
  ].join('\n')

  return {
    status: 'organized',
    summary,
    client: resolvedClient,
    notify: autoNotify,
  }
}

function OperationsDashboard() {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id)
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [sessionUser, setSessionUser] = useState(null)

  const [projects, setProjects] = useState(projectSeeds)
  const [activeProjectId, setActiveProjectId] = useState(projectSeeds[0]?.id ?? null)
  const [messageDraft, setMessageDraft] = useState('')

  const [noteDraft, setNoteDraft] = useState({
    text: '',
    client: '',
    attachments: [],
    notify: [],
    attachmentType: 'image',
    attachmentLabel: '',
  })

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId, projects],
  )

  const structuredNotes = useMemo(
    () =>
      projects
        .flatMap((project) =>
          project.notes.map((note) => ({ ...note, projectName: project.name, projectId: project.id })),
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [projects],
  )

  const handleLogin = (event) => {
    event.preventDefault()
    const account = accounts.find((entry) => entry.id === selectedAccountId)
    if (!account) {
      setAuthError('Choose an account to continue.')
      return
    }

    if (passwordInput !== account.password) {
      setAuthError('Incorrect password for this account.')
      return
    }

    setSessionUser(account)
    setPasswordInput('')
    setAuthError('')
  }

  const handleMessageSubmit = (event) => {
    event.preventDefault()
    if (!sessionUser || !activeProject || !messageDraft.trim()) return

    const newUpdate = {
      id: `update-${Date.now()}`,
      author: sessionUser.name,
      authorId: sessionUser.id,
      body: messageDraft.trim(),
      createdAt: new Date().toISOString(),
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProject.id
          ? { ...project, updates: [newUpdate, ...project.updates] }
          : project,
      ),
    )

    setMessageDraft('')
  }

  const handleAddAttachment = () => {
    if (!noteDraft.attachmentLabel.trim()) return
    const typeEntry = attachmentTypes.find((entry) => entry.id === noteDraft.attachmentType)
    if (!typeEntry) return

    const attachment = {
      id: `${noteDraft.attachmentType}-${Date.now()}`,
      type: noteDraft.attachmentType,
      label: noteDraft.attachmentLabel.trim(),
    }

    setNoteDraft((prev) => ({
      ...prev,
      attachments: [...prev.attachments, attachment],
      attachmentLabel: '',
    }))
  }

  const handleRemoveAttachment = (attachmentId) => {
    setNoteDraft((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((item) => item.id !== attachmentId),
    }))
  }

  const toggleNotify = (recipientId) => {
    setNoteDraft((prev) => ({
      ...prev,
      notify: prev.notify.includes(recipientId)
        ? prev.notify.filter((id) => id !== recipientId)
        : [...prev.notify, recipientId],
    }))
  }

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    if (!sessionUser || !activeProject || !noteDraft.text.trim()) return

    const baseNote = {
      id: `note-${Date.now()}`,
      text: noteDraft.text.trim(),
      attachments: noteDraft.attachments,
      createdAt: new Date().toISOString(),
      client: noteDraft.client.trim(),
      notify: noteDraft.notify,
    }

    const aiResult = analyseNote(baseNote)
    const finalNote = { ...baseNote, ...aiResult }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProject.id
          ? { ...project, notes: [finalNote, ...project.notes] }
          : project,
      ),
    )

    setNoteDraft({ text: '', client: '', attachments: [], notify: [], attachmentType: 'image', attachmentLabel: '' })
  }

  const logout = () => {
    setSessionUser(null)
    setActiveProjectId(projectSeeds[0]?.id ?? null)
    setPasswordInput('')
    setAuthError('')
    setMessageDraft('')
    setNoteDraft({ text: '', client: '', attachments: [], notify: [], attachmentType: 'image', attachmentLabel: '' })
  }

  return (
    <div className="min-h-screen bg-slate-950 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pt-24 pb-16 text-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
            <Lock size={16} /> Secure Operations Portal
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white md:text-4xl">KMJK Field Command Dashboard</h1>
              <p className="mt-2 max-w-3xl text-base text-slate-300">
                Collaborate with Hostway on active builds, drop multimodal notes, and let the AI pass the right details to the
                right teammate. Everything here runs in-browser so you can validate the experience before wiring a real backend.
              </p>
            </div>
            {sessionUser ? (
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/50 p-4">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${sessionUser.accent}`}></div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-300">Signed in as</p>
                  <p className="text-lg font-semibold text-white">{sessionUser.name}</p>
                </div>
                <Button variant="outline" className="border-white/20 text-slate-100" onClick={logout}>
                  <LogOut size={16} className="mr-2" /> Sign out
                </Button>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-5 text-emerald-100">
                <p className="text-sm font-semibold uppercase tracking-wide">Private</p>
                <p className="text-xs text-emerald-200/80">
                  Demo passwords match the ones you requested. Replace this with Supabase or Firebase auth before launch.
                </p>
              </div>
            )}
          </div>
        </header>

        {!sessionUser ? (
          <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:grid-cols-5">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-white">Choose your access bubble</h2>
              <p className="mt-2 text-sm text-slate-300">
                Tap a profile, enter your passphrase, and you&apos;re in. Everything stays client-side in this prototype.
              </p>
              <div className="mt-6 grid gap-4">
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => setSelectedAccountId(account.id)}
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition hover:border-white/60 ${
                      selectedAccountId === account.id
                        ? 'border-white bg-white/20'
                        : 'border-white/10 bg-black/30'
                    }`}
                  >
                    <div className={`h-12 w-12 flex-none rounded-full bg-gradient-to-br ${account.accent}`}></div>
                    <div>
                      <p className="text-lg font-semibold text-white">{account.name}</p>
                      <p className="text-xs uppercase tracking-widest text-slate-300">{account.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <form className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-black/40 p-6 md:col-span-3" onSubmit={handleLogin}>
              <div>
                <label className="text-sm font-semibold text-slate-200" htmlFor="password-input">
                  Passphrase
                </label>
                <input
                  id="password-input"
                  type="password"
                  autoComplete="current-password"
                  className="mt-2 w-full rounded-xl border border-white/20 bg-slate-900 px-4 py-3 text-slate-100 focus:border-emerald-400 focus:outline-none"
                  placeholder="Enter passphrase"
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                />
                <p className="mt-2 text-xs text-slate-400">Josue: Cotton247 &nbsp;|&nbsp; Chris: C0tt0n247</p>
              </div>
              {authError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <AlertCircle size={18} /> {authError}
                </div>
              )}
              <Button type="submit" className="h-12 bg-emerald-500 hover:bg-emerald-400">
                Enter dashboard
              </Button>
            </form>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-12">
            <aside className="flex flex-col gap-6 lg:col-span-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                  <Users size={16} /> Active projects
                </div>
                <ul className="mt-5 space-y-4">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => setActiveProjectId(project.id)}
                        className={`w-full rounded-2xl border-2 p-4 text-left transition ${
                          activeProjectId === project.id
                            ? 'border-emerald-400 bg-emerald-400/10'
                            : 'border-white/10 bg-black/40 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                          <span className="text-xs uppercase tracking-wide text-slate-300">Due {project.due}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-300">Client: {project.client}</p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                          {project.status}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-slate-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                  <CheckCircle2 size={16} /> Launch checklist
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  <li>Connect Supabase or Firebase Auth so these credentials live server-side.</li>
                  <li>Store uploads in cloud storage and save signed URLs with each note.</li>
                  <li>Forward notes to an OpenAI Agent (GPT-4o today, GPT-5 nano when available) for routing + summaries.</li>
                  <li>Trigger Resend/SendGrid emails whenever notify flags are returned.</li>
                </ul>
              </div>
            </aside>

            <div className="flex flex-col gap-6 lg:col-span-8">
              {activeProject && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                    <MessageSquare size={16} /> {activeProject.name} thread
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    Use this feed to keep Hostway and the office in sync. Messages appear newest first for quick triage.
                  </p>
                  <form className="mt-6 flex flex-col gap-4" onSubmit={handleMessageSubmit}>
                    <textarea
                      className="min-h-[120px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                      placeholder="Type an update for this project..."
                      value={messageDraft}
                      onChange={(event) => setMessageDraft(event.target.value)}
                    ></textarea>
                    <div className="flex flex-wrap justify-between gap-3 text-xs text-slate-400">
                      <span>Tip: Mention Josue or Chris to auto-tag them.</span>
                      <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400">
                        Post update
                      </Button>
                    </div>
                  </form>
                  <ul className="mt-6 space-y-4">
                    {activeProject.updates.map((update) => (
                      <li key={update.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">{update.author}</p>
                          <span className="text-xs uppercase tracking-wide text-slate-400">{formatDate(update.createdAt)}</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-200 whitespace-pre-wrap">{update.body}</p>
                      </li>
                    ))}
                    {!activeProject.updates.length && (
                      <li className="rounded-2xl border border-dashed border-white/10 bg-black/30 p-4 text-sm text-slate-400">
                        No updates yet. Be the first to leave one!
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                  <UploadCloud size={16} /> Upload a project note
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Drop site photos, transcribed audio, or quick checklists. The AI pass will organize by client and flag who needs an email.
                </p>
                <form className="mt-6 space-y-5" onSubmit={handleNoteSubmit}>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">Note text</label>
                    <textarea
                      className="mt-2 min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                      placeholder="Paste transcription, type instructions, or describe the upload..."
                      value={noteDraft.text}
                      onChange={(event) => setNoteDraft((prev) => ({ ...prev, text: event.target.value }))}
                    ></textarea>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">Client (optional)</label>
                      <input
                        type="text"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                        placeholder="Enter client if known"
                        value={noteDraft.client}
                        onChange={(event) => setNoteDraft((prev) => ({ ...prev, client: event.target.value }))}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Notify</p>
                      <div className="mt-2 flex flex-wrap gap-3">
                        {recipients.map((recipient) => (
                          <button
                            key={recipient.id}
                            type="button"
                            onClick={() => toggleNotify(recipient.id)}
                            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wide transition ${
                              noteDraft.notify.includes(recipient.id)
                                ? 'border-emerald-400 bg-emerald-400/20 text-emerald-100'
                                : 'border-white/10 bg-black/40 text-slate-200 hover:border-white/30'
                            }`}
                          >
                            {recipient.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Attachments</p>
                    <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-dashed border-white/20 bg-black/30 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                        <div className="flex items-center gap-3">
                          {attachmentTypes.map((entry) => {
                            const Icon = entry.icon
                            return (
                              <button
                                key={entry.id}
                                type="button"
                                onClick={() => setNoteDraft((prev) => ({ ...prev, attachmentType: entry.id }))}
                                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                                  noteDraft.attachmentType === entry.id
                                    ? 'border-emerald-400 bg-emerald-400/20 text-emerald-100'
                                    : 'border-white/10 bg-black/40 text-slate-200 hover:border-white/30'
                                }`}
                              >
                                <Icon size={18} />
                              </button>
                            )
                          })}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                            placeholder="Describe the upload – e.g. ‘Framing photo set’"
                            value={noteDraft.attachmentLabel}
                            onChange={(event) => setNoteDraft((prev) => ({ ...prev, attachmentLabel: event.target.value }))}
                          />
                        </div>
                        <Button type="button" variant="outline" className="border-white/20 text-slate-100" onClick={handleAddAttachment}>
                          Add attachment
                        </Button>
                      </div>
                      {noteDraft.attachments.length > 0 ? (
                        <ul className="space-y-2 text-sm text-slate-200">
                          {noteDraft.attachments.map((attachment) => {
                            const Icon = attachmentTypes.find((entry) => entry.id === attachment.type)?.icon ?? FileText
                            return (
                              <li key={attachment.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                                <span className="flex items-center gap-2">
                                  <Icon size={16} /> {attachment.label}
                                </span>
                                <button
                                  type="button"
                                  className="text-xs uppercase tracking-wide text-red-300 hover:text-red-200"
                                  onClick={() => handleRemoveAttachment(attachment.id)}
                                >
                                  Remove
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-400">No attachments yet. Add a quick label and tap “Add attachment”.</p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400">
                    Send to AI organizer
                  </Button>
                </form>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                  <Mail size={16} /> Structured note log
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Notes appear here after the AI pass. The notify column shows who should receive an email once hooked up to Resend.
                </p>
                <div className="mt-5 space-y-4">
                  {structuredNotes.map((note) => (
                    <div key={note.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{note.projectName}</p>
                          <p className="text-xs uppercase tracking-wide text-slate-400">{formatDate(note.createdAt)}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide">
                          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-200">{note.status}</span>
                          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-emerald-200">
                            {note.client || 'Client TBD'}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-amber-200">
                            Notify: {note.notify.length ? note.notify.map((id) => (id === 'josue' ? 'Josue' : 'Chris')).join(', ') : 'None'}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-slate-200 whitespace-pre-wrap">{note.text}</p>
                      {note.attachments.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
                          {note.attachments.map((attachment) => {
                            const Icon = attachmentTypes.find((entry) => entry.id === attachment.type)?.icon ?? FileText
                            return (
                              <li key={attachment.id} className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-1">
                                <Icon size={14} /> {attachment.label}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      <div className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs text-emerald-100">
                        <p className="font-semibold uppercase tracking-wide text-emerald-200">AI summary</p>
                        <p className="mt-1 whitespace-pre-wrap text-emerald-100">{note.summary}</p>
                      </div>
                    </div>
                  ))}
                  {!structuredNotes.length && (
                    <p className="text-sm text-slate-400">No notes yet. Submit something above to see the organized output.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default OperationsDashboard
