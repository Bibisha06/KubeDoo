"""Groq LLM client for free AI inference."""

import logging
from typing import Any, Dict, List, Optional
from openai import AsyncOpenAI


class GroqClient:
    """Groq client for free AI inference using OpenAI-compatible API."""
    
    def __init__(self, api_key: str, model: str = "llama3-8b-8192"):
        """Initialize Groq client.
        
        Args:
            api_key: Groq API key (starts with gsk_)
            model: Model to use (llama3-8b-8192, mixtral-8x7b-32768, etc.)
        """
        self.api_key = api_key
        self.model = model
        self.client = AsyncOpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1"
        )
        self.logger = logging.getLogger(__name__)
    
    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        max_tokens: int = 2000,
        temperature: float = 0.7,
        **kwargs
    ) -> str:
        """Get chat completion from Groq.
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature (0.0 to 1.0)
            **kwargs: Additional parameters
            
        Returns:
            Generated text response
        """
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature,
                **kwargs
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            self.logger.error(f"Groq API error: {e}")
            raise
    
    async def simple_prompt(self, prompt: str, max_tokens: int = 2000) -> str:
        """Simple prompt completion.
        
        Args:
            prompt: The prompt text
            max_tokens: Maximum tokens to generate
            
        Returns:
            Generated response
        """
        messages = [{"role": "user", "content": prompt}]
        return await self.chat_completion(messages, max_tokens=max_tokens)
    
    async def validate_api_key(self) -> bool:
        """Validate the Groq API key.
        
        Returns:
            True if valid, False otherwise
        """
        try:
            await self.simple_prompt("Hi", max_tokens=10)
            return True
        except Exception as e:
            self.logger.error(f"Groq API key validation failed: {e}")
            return False


# Available Groq models (all free!)
GROQ_MODELS = {
    "llama3-8b-8192": "Llama 3 8B (Fastest, good for most tasks)",
    "llama3-70b-8192": "Llama 3 70B (More capable, slower)",
    "mixtral-8x7b-32768": "Mixtral 8x7B (Good balance)",
    "gemma-7b-it": "Gemma 7B (Google's model)",
}
