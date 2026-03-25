export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { title, description, content, tags } = req.body;

    // Basic Validation
    if (!title || !description || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ error: 'Title, description, and content are required' });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; // format: "owner/repo"

    // If environment not set up, gracefully mock response in development
    if (!githubToken || !githubRepo) {
      console.warn("Missing GitHub credentials in environment. Mocking success response.");
      return res.status(200).json({ success: true, id: 'mock-id-local-dev', mock: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const submissionId = `submission-${timestamp}-${Math.random().toString(36).substr(2, 5)}`;
    const path = `submissions/${submissionId}.json`;

    const submissionData = {
      id: submissionId,
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      tags: Array.isArray(tags) ? tags : [],
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    const contentEncoded = Buffer.from(JSON.stringify(submissionData, null, 2)).toString('base64');

    const githubRes = await fetch(`https://api.github.com/repos/${githubRepo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `New prompt submission: ${title}`,
        content: contentEncoded
      })
    });

    if (!githubRes.ok) {
      const gitError = await githubRes.json();
      console.error('GitHub API Error:', gitError);
      return res.status(502).json({ error: 'Failed to save submission to GitHub repository' });
    }

    return res.status(200).json({ success: true, id: submissionId });
  } catch (error) {
    console.error('Server logic error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
