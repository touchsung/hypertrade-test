from fastapi import Request, Response
import time
import logging
from typing import Callable
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def log_request_middleware(request: Request, call_next: Callable):
    start_time = time.time()

    # Log request details
    logger.info(f"Request started: {request.method} {request.url}")

    try:
        # Get request body
        body = await request.body()
        if body:
            logger.info(f"Request body: {body.decode()}")

        response = await call_next(request)

        # Process response
        response_body = b""
        async for chunk in response.body_iterator:
            response_body += chunk

        # Log response details
        process_time = time.time() - start_time
        logger.info(
            f"Request completed: {request.method} {request.url} "
            f"Status: {response.status_code} "
            f"Duration: {process_time:.3f}s"
        )

        return Response(
            content=response_body,
            status_code=response.status_code,
            headers=dict(response.headers),
            media_type=response.media_type,
        )

    except Exception as e:
        logger.error(f"Request failed: {str(e)}")
        raise
