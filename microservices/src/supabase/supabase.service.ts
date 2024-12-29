import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async insert(table: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase.from(table).insert(data);
    if (error) throw new Error(error.message);
    return result;
  }

  async select(table: string, filters: any = {}, options: any = {}): Promise<any> {
    let query = this.supabase.from(table).select(options.select || '*');
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
    if (options.order) {
      query = query.order(options.order.by, { ascending: options.order.ascending });
    }
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  }
}
