export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    if (!key) {
      return new Response('Missing file key', { status: 400, headers: corsHeaders });
    }

    try {
      // 1. Upload
      if (request.method === 'PUT') {
        await env.VAULT_BUCKET.put(key, request.body);
        return new Response(JSON.stringify({ success: true, key }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // 2. Download / View
      if (request.method === 'GET') {
        const object = await env.VAULT_BUCKET.get(key);
        if (!object) {
          return new Response('File Not Found', { status: 404, headers: corsHeaders });
        }
        const headers = new Headers(corsHeaders);
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        return new Response(object.body, { headers });
      }

      // 3. Delete
      if (request.method === 'DELETE') {
        await env.VAULT_BUCKET.delete(key);
        return new Response(JSON.stringify({ deleted: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    } catch (err) {
      return new Response(err.message, { status: 500, headers: corsHeaders });
    }
  }
};
