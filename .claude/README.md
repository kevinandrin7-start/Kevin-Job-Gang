# Resume template guard

`settings.json` registers a Claude Code **PostToolUse** hook. After every tool call it runs
`/mnt/project-files/job-hunt/tools/resume_hook.py`, which checks each tailored resume
(`Kevin_Rajan_Resume.docx/.pdf/.html`) that the call created or changed against Kevin's template,
`job-hunt/profile/template/resume_template.docx` (Times New Roman, badge logos, page border,
section headings, 2 pages).

A resume that fails is moved to `<resume folder>/rejected/` and Claude is blocked with the reasons,
so it must rebuild it with `tools/tailor.py` (or `tools/restyle.py`) instead of uploading or applying with it.

The same hook is installed for cloud sessions by the environment's setup script, because those
sessions start one folder above this repo. If the project files are not mounted, the hook does nothing.
