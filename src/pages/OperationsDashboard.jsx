import { useMemo, useState } from 'react'
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Mic,
  ShieldCheck,
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
    passwordHash: 'd7962818d115bdbca56efe59e69b37aa8a74abce49010f52a85d3c55741ffe35',
    fallbackPassword: 'Cotton247',
    accent: 'from-sky-500 via-blue-500 to-indigo-500',
  },
  {
    id: 'chris',
    name: 'Chris Cotton',
    title: 'Owner / Field Operations',
    email: 'chris@theeliteservicehub.com',
    phone: '650-501-7659',
    passwordHash: 'b48beaa3060f4c75053f18e9ea73c2eb071c913fd551b00a53443bcf057a7250',
    fallbackPassword: 'C0tt0n247',
    accent: 'from-amber-500 via-orange-500 to-rose-500',
  },
]

const projectsSeed = [
  {
    id: 'marquez-suite',
    name: 'Marquez Primary Suite',
    client: 'Marquez Family',
    status: 'Rough-in walk-through scheduled',
    due: 'Oct 12',
    tags: ['bathroom', 'millwork'],
    updates: [
      {
        id: 'up-1',
        author: 'Josue Lopez',
        role: 'Project Director',
        text: 'Municipal inspections cleared. Hostway can begin closing walls after electrical touch-ups.',
        timestamp: '2025-10-07T10:22:00Z',
      },
      {
        id: 'up-2',
        author: 'Chris Cotton',
        role: 'Owner / Field Operations',
        text: 'Framing punch list complete. Added photo set to shared drive.',
        timestamp: '2025-10-06T21:10:00Z',
      },
    ],
    notes: [
      {
        id: 'note-1',
        type: 'text',
        author: 'Josue Lopez',
        text: 'Client approved the brushed brass plumbing trim. Update procurement to release PO.',
        timestamp: '2025-10-05T17:32:00Z',
        status: 'organized',
        summary: 'Approved brass trim for Marquez bath; release purchase order.',
        notify: ['josue'],
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
        id: 'up-3',
        author: 'Chris Cotton',
        role: 'Owner / Field Operations',
        text: 'Demo complete. Need confirmation on island outlet layout before Friday.',
        timestamp: '2025-10-07T14:40:00Z',
      },
    ],
    notes: [],
  },
]

const attachmentIcons = {
  image: ImageIcon,
  audio: Mic,
  document: FileText,
}

const emailTargets = [
  { id: 'josue', label: 'Email Josue' },
  { id: 'chris', label: 'Email Chris' },
]

async function hashPassword(input) {
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    return input
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(digest))
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

function formatRelative(timestamp) {
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return 'Just now'
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function simulateAiProcessing({ text, files, client, sendEmailTo }) {
  const lower = text.toLowerCase()
  let detectedClient = client
  const keywordToClient = [
    { keyword: 'marquez', client: 'Marquez Family' },
    { keyword: 'fitzgerald', client: 'Fitzgerald Residence' },
    { keyword: 'hostway', client: 'KMJK Field Ops' },
  ]

  if (!detectedClient) {
    const match = keywordToClient.find((entry) => lower.includes(entry.keyword))
    if (match) detectedClient = match.client
  }

  const nextSteps = []
  if (lower.includes('screw')) {
    nextSteps.push('Flag hardware change for carpentry team')
  }
  if (lower.includes('nail')) {
    nextSteps.push('Confirm fastener schedule with structural lead')
  }
  if (files.some((file) => file.kind === 'image')) {
    nextSteps.push('Sync uploaded images to project gallery folder')
  }
  if (files.some((file) => file.kind === 'audio')) {
    nextSteps.push('Transcribe new audio note and attach to daily report')
  }

  if (!nextSteps.length) {
    nextSteps.push('Review note details and update task board')
  }

  const notify = sendEmailTo.length ? sendEmailTo : lower.includes('chris') ? ['chris'] : lower.includes('josue') ? ['josue'] : []

  const summary = [
    detectedClient ? `Client: ${detectedClient}` : 'Client not detected — needs review',
    `Captured ${files.length ? files.length : 'no'} attachment${files.length === 1 ? '' : 's'}.`,
    nextSteps.join(' • '),
  ].join(' \n')

  return {
    status: 'organized',
    summary,
    notify,
    client: detectedClient,
  }
}

function OperationsDashboard() {
  const [activeUserId, setActiveUserId] = useState(null)
  const [passwordInput, setPasswordInput] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authError, setAuthError] = useState('')
  const [sessionUser, setSessionUser] = useState(null)
  const [projects, setProjects] = useState(projectsSeed)
  const [activeProjectId, setActiveProjectId] = useState(projectsSeed[0]?.id ?? null)
  const [messageDraft, setMessageDraft] = useState('')
  const [noteDraft, setNoteDraft] = useState({
    text: '',
    files: [],
    client: '',
    sendEmailTo: [],
  })
  const [processingNotes, setProcessingNotes] = useState([])

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId, projects],
  )

  const clients = useMemo(() => {
    const fromProjects = projects.map((project) => project.client)
    const distinct = Array.from(new Set(fromProjects))
    return distinct.sort()
  }, [projects])

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!activeUserId) {
      setAuthError('Select a user to continue.')
      return
    }

    const account = accounts.find((item) => item.id === activeUserId)
    if (!account) {
      setAuthError('Account not found.')
      return
    }

    setIsAuthenticating(true)
    setAuthError('')

    try {
      const digest = await hashPassword(passwordInput)
      const verified = digest === account.passwordHash || passwordInput === account.fallbackPassword
      if (!verified) {
        setAuthError('Incorrect password for this account.')
        return
      }

      setSessionUser(account)
      setPasswordInput('')
    } catch (error) {
      console.error(error)
      setAuthError('Unable to verify credentials in this prototype.')
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleAddUpdate = (event) => {
    event.preventDefault()
    if (!sessionUser || !messageDraft.trim() || !activeProject) return

    const newUpdate = {
      id: `up-${Date.now()}`,
      author: sessionUser.name,
      role: sessionUser.title,
      text: messageDraft.trim(),
      timestamp: new Date().toISOString(),
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return

    const normalized = files.map((file) => {
      const type = file.type.startsWith('image') ? 'image' : file.type.startsWith('audio') ? 'audio' : 'document'
      return {
        id: `${type}-${file.name}-${Date.now()}`,
        kind: type,
        name: file.name,
        size: file.size,
      }
    })

    setNoteDraft((prev) => ({ ...prev, files: [...prev.files, ...normalized] }))
    event.target.value = ''
  }

  const toggleEmailTarget = (id) => {
    setNoteDraft((prev) => {
      const exists = prev.sendEmailTo.includes(id)
      return {
        ...prev,
        sendEmailTo: exists
          ? prev.sendEmailTo.filter((item) => item !== id)
          : [...prev.sendEmailTo, id],
      }
    })
  }

  const removeFile = (fileId) => {
    setNoteDraft((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file.id !== fileId),
    }))
  }

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    if (!sessionUser || !noteDraft.text.trim()) return

    const newNote = {
      id: `note-${Date.now()}`,
      type: noteDraft.files.length ? 'multimodal' : 'text',
      author: sessionUser.name,
      text: noteDraft.text.trim(),
      timestamp: new Date().toISOString(),
      status: 'processing',
      files: noteDraft.files,
      client: noteDraft.client,
      sendEmailTo: noteDraft.sendEmailTo,
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProjectId
          ? { ...project, notes: [newNote, ...project.notes] }
          : project,
      ),
    )

    setProcessingNotes((prev) => [newNote.id, ...prev])

    setTimeout(() => {
      const aiResult = simulateAiProcessing(newNote)
      setProjects((prev) =>
        prev.map((project) =>
          project.id === activeProjectId
            ? {
                ...project,
                notes: project.notes.map((note) =>
                  note.id === newNote.id ? { ...note, ...aiResult } : note,
                ),
              }
            : project,
        ),
      )
      setProcessingNotes((prev) => prev.filter((id) => id !== newNote.id))
    }, 750)

    setNoteDraft({ text: '', files: [], client: '', sendEmailTo: [] })
  }

  const logout = () => {
    setSessionUser(null)
    setActiveUserId(null)
    setPasswordInput('')
    setNoteDraft({ text: '', files: [], client: '', sendEmailTo: [] })
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
              <p className="mt-2 max-w-2xl text-base text-slate-300">
                Collaborate with Hostway, capture job-site context in any format, and let the AI organizer sort and deliver
                updates to the right teammate. This prototype keeps everything on the front end so you can validate the flow
                before wiring services like Supabase, Resend, and OpenAI Agents.
              </p>
            </div>
            {sessionUser ? (
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${sessionUser.accent}`}></div>
                <div>
                  <p className="text-sm text-slate-300">Signed in as</p>
                  <p className="text-lg font-semibold text-white">{sessionUser.name}</p>
                </div>
                <Button variant="outline" className="border-white/20 text-slate-100" onClick={logout}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-5 text-emerald-100">
                <p className="text-sm font-semibold uppercase tracking-wide">Private</p>
                <p className="text-xs text-emerald-200/80">
                  Passwords are verified client-side for demo purposes only. Wire this flow to a real auth provider before
                  launching.
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
                Tap your name and enter the shared passphrase. Hashing runs in-browser so the clear text never leaves the device
                in this mockup.
              </p>
              <div className="mt-6 grid gap-4">
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => setActiveUserId(account.id)}
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition hover:border-white/70 ${
                      activeUserId === account.id
                        ? 'border-white bg-white/20'
                        : 'border-white/10 bg-black/30'
                    }`}
                  >
                    <div className={`h-12 w-12 flex-none rounded-full bg-gradient-to-br ${account.accent}`}></div>
                    <div>
                      <p className="text-lg font-semibold text-white">{account.name}</p>
                      <p className="text-xs uppercase tracking-wider text-slate-300">{account.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <form className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-black/30 p-6 md:col-span-3" onSubmit={handleLogin}>
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
                <p className="mt-2 text-xs text-slate-400">
                  Josue: Cotton247 &nbsp;|&nbsp; Chris: C0tt0n247 — stored as SHA-256 hashes in the browser for this demo.
                </p>
              </div>
              {authError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <AlertCircle size={18} />
                  {authError}
                </div>
              )}
              <Button type="submit" disabled={isAuthenticating} className="h-12 bg-emerald-500 hover:bg-emerald-400">
                {isAuthenticating ? 'Verifying…' : 'Enter Dashboard'}
              </Button>
            </form>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-12">
            <aside className="flex flex-col gap-6 lg:col-span-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                  <Users size={16} /> Active Projects
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
                            : 'border-white/10 bg-black/30 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                          <span className="text-xs uppercase tracking-wide text-slate-300">{project.due}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-300">Client: {project.client}</p>
                        <p className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-200">
                          <Activity size={14} /> {project.status}
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
                  <ShieldCheck size={16} /> Implementation Checklist
                </div>
                <ol className="mt-4 space-y-3 text-sm text-slate-200">
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 text-emerald-400" size={18} />
                    Scaffold Supabase or Firebase for auth, storage, and real-time updates.
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 text-emerald-400" size={18} />
                    Connect OpenAI Agent (GPT-4.1 mini today, swap to GPT-5 nano when available) for triage + routing.
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 text-emerald-400" size={18} />
                    Trigger Resend/SendGrid email when Agent response includes notify directives.
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 text-emerald-400" size={18} />
                    Mirror structured note data into Notion or your PM tool via webhooks.
                  </li>
                </ol>
              </div>
            </aside>

            <div className="flex flex-col gap-6 lg:col-span-8">
              {activeProject && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">{activeProject.name}</h2>
                      <p className="text-sm text-slate-300">Client: {activeProject.client}</p>
                    </div>
                    <div className="flex gap-2 text-xs uppercase tracking-wider text-slate-300">
                      <Layers size={16} />
                      {activeProject.tags.join(' • ')}
                    </div>
                  </div>
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-slate-300">
                        <MessageSquare size={16} /> Thread with Hostway
                      </div>
                      <form onSubmit={handleAddUpdate} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <label htmlFor="update-entry" className="sr-only">
                          Add an update
                        </label>
                        <textarea
                          id="update-entry"
                          rows={3}
                          className="w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                          placeholder="Share a status update, decision, or question for Hostway."
                          value={messageDraft}
                          onChange={(event) => setMessageDraft(event.target.value)}
                        />
                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-xs text-slate-400">Updates stay with this project thread.</p>
                          <Button type="submit" disabled={!messageDraft.trim()} size="sm" className="bg-emerald-500 hover:bg-emerald-400">
                            Post update
                          </Button>
                        </div>
                      </form>

                      <ul className="space-y-3">
                        {activeProject.updates.map((update) => (
                          <li key={update.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-300">
                              <span>{update.author}</span>
                              <span>{formatRelative(update.timestamp)}</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-400">{update.role}</p>
                            <p className="mt-3 text-sm text-slate-100">{update.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-slate-300">
                        <UploadCloud size={16} /> Multimodal note intake
                      </div>
                      <form onSubmit={handleNoteSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wide text-slate-300" htmlFor="note-text">
                            Note to organize
                          </label>
                          <textarea
                            id="note-text"
                            rows={4}
                            className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                            placeholder="Drop text notes, transcription snippets, material lists, etc."
                            value={noteDraft.text}
                            onChange={(event) => setNoteDraft((prev) => ({ ...prev, text: event.target.value }))}
                          />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-300" htmlFor="note-client">
                              Client (optional)
                            </label>
                            <select
                              id="note-client"
                              className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                              value={noteDraft.client}
                              onChange={(event) => setNoteDraft((prev) => ({ ...prev, client: event.target.value }))}
                            >
                              <option value="">Detect automatically</option>
                              {clients.map((client) => (
                                <option key={client} value={client}>
                                  {client}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                              Notify
                            </label>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {emailTargets.map((target) => {
                                const active = noteDraft.sendEmailTo.includes(target.id)
                                return (
                                  <button
                                    key={target.id}
                                    type="button"
                                    onClick={() => toggleEmailTarget(target.id)}
                                    className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition ${
                                      active
                                        ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200'
                                        : 'border-white/20 bg-black/40 text-slate-300 hover:border-white/40'
                                    }`}
                                  >
                                    <Mail size={14} className="mr-1 inline" />
                                    {target.label}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wide text-slate-300" htmlFor="note-files">
                            Attachments
                          </label>
                          <input
                            id="note-files"
                            type="file"
                            accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
                            multiple
                            className="mt-2 block w-full text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-400"
                            onChange={handleFileChange}
                          />
                          <p className="mt-2 text-xs text-slate-400">
                            Images, field sketches, voice memos, material lists — drop them all. The AI agent will align and notify.
                          </p>
                          {!!noteDraft.files.length && (
                            <ul className="mt-3 space-y-2">
                              {noteDraft.files.map((file) => {
                                const Icon = attachmentIcons[file.kind] ?? FileText
                                return (
                                  <li key={file.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm">
                                    <span className="flex items-center gap-2 text-slate-100">
                                      <Icon size={16} />
                                      {file.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => removeFile(file.id)}
                                      className="text-xs uppercase tracking-wide text-rose-200 hover:text-rose-100"
                                    >
                                      Remove
                                    </button>
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </div>
                        <Button
                          type="submit"
                          disabled={!noteDraft.text.trim()}
                          className="w-full bg-emerald-500 hover:bg-emerald-400"
                        >
                          Send to AI Organizer
                        </Button>
                      </form>
                      {processingNotes.length > 0 && (
                        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                          <p className="font-semibold uppercase tracking-wide">Processing</p>
                          <p className="mt-1 text-emerald-200/80">
                            {processingNotes.length} note{processingNotes.length === 1 ? '' : 's'} queued with the KMJK Agent. Refreshing automatically.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                  <FileText size={16} /> Structured note log
                </div>
                <div className="mt-4 space-y-4">
                  {projects
                    .filter((project) => project.notes.length)
                    .map((project) => (
                      <div key={project.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        <ul className="mt-3 space-y-3">
                          {project.notes.map((note) => (
                            <li key={note.id} className="rounded-xl border border-white/10 bg-black/40 p-4">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm font-semibold text-white">{note.author}</p>
                                <p className="text-xs uppercase tracking-wide text-slate-400">{formatRelative(note.timestamp)}</p>
                              </div>
                              <p className="mt-3 text-sm text-slate-200 whitespace-pre-wrap">{note.text}</p>
                              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide">
                                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-200">
                                  {note.status === 'organized' ? 'Organized' : 'Processing'}
                                </span>
                                {note.client && (
                                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-emerald-200">
                                    {note.client}
                                  </span>
                                )}
                                {note.notify?.length ? (
                                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-amber-200">
                                    <Mail size={14} />
                                    {note.notify.map((id) => (id === 'josue' ? 'Josue' : 'Chris')).join(', ')}
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-300">
                                    <Mail size={14} />
                                    No emails queued
                                  </span>
                                )}
                              </div>
                              {note.summary && (
                                <div className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-3 text-xs text-emerald-100">
                                  <p className="font-semibold uppercase tracking-wide text-emerald-200">Agent summary</p>
                                  <p className="mt-1 whitespace-pre-wrap text-emerald-100">{note.summary}</p>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  {!projects.some((project) => project.notes.length) && (
                    <p className="text-sm text-slate-300">
                      Notes routed here after the AI finishes processing. Submit a note above to see the structured output.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                    <MessageSquare size={16} /> Agent blueprint
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-200">
                    <li className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 text-emerald-400" size={18} />
                      Create an OpenAI Agent with instructions to: classify client/project, summarize action items, and return notify targets.
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 text-emerald-400" size={18} />
                      Enable the multimodal toolset (vision + audio) so uploads route through GPT-4o today, GPT-5 nano when available.
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 text-emerald-400" size={18} />
                      Persist structured results in your database and emit a webhook to send notifications.
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
                    <AlertCircle size={16} /> Next engineering tasks
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-200">
                    <li>Wire auth bubbles to Supabase Auth (email or magic link) and move password hashes server-side.</li>
                    <li>Replace the simulated AI call with a `/api/notes` endpoint that forwards to the OpenAI Agents API.</li>
                    <li>Use storage buckets for images/audio and persist signed URLs alongside each note.</li>
                    <li>Automate email delivery with Resend + project-branded templates.</li>
                  </ul>
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
