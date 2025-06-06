export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_categories: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          category_id: number | null
          content: string
          created_at: string
          excerpt: string
          featured: boolean
          id: number
          image: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: number | null
          content: string
          created_at?: string
          excerpt: string
          featured?: boolean
          id?: number
          image?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: number | null
          content?: string
          created_at?: string
          excerpt?: string
          featured?: boolean
          id?: number
          image?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "page_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_features: {
        Row: {
          created_at: string
          feature: string
          id: number
          included: boolean
          order_position: number
          plan_id: number
        }
        Insert: {
          created_at?: string
          feature: string
          id?: number
          included?: boolean
          order_position?: number
          plan_id: number
        }
        Update: {
          created_at?: string
          feature?: string
          id?: number
          included?: boolean
          order_position?: number
          plan_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plan_features_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          button_text: string
          created_at: string
          description: string
          id: number
          name: string
          order_position: number
          popular: boolean
          price: string
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["plan_status"]
          updated_at: string
        }
        Insert: {
          button_text?: string
          created_at?: string
          description: string
          id?: number
          name: string
          order_position?: number
          popular?: boolean
          price: string
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["plan_status"]
          updated_at?: string
        }
        Update: {
          button_text?: string
          created_at?: string
          description?: string
          id?: number
          name?: string
          order_position?: number
          popular?: boolean
          price?: string
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["plan_status"]
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string
          client: string | null
          completion_date: string | null
          created_at: string
          description: string
          detailed_description: string | null
          enabled: boolean
          id: number
          image: string
          technologies: string[] | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          category: string
          client?: string | null
          completion_date?: string | null
          created_at?: string
          description: string
          detailed_description?: string | null
          enabled?: boolean
          id?: number
          image: string
          technologies?: string[] | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          category?: string
          client?: string | null
          completion_date?: string | null
          created_at?: string
          description?: string
          detailed_description?: string | null
          enabled?: boolean
          id?: number
          image?: string
          technologies?: string[] | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          last_login: string | null
          name: string
          role: Database["public"]["Enums"]["user_role"]
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          last_login?: string | null
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_login?: string | null
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean
          id: number
          name: string
          order_position: number
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: number
          name: string
          order_position?: number
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: number
          name?: string
          order_position?: number
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          benefits: string[] | null
          category_id: number
          complexity: Database["public"]["Enums"]["service_complexity"]
          content: string
          cover_image: string | null
          created_at: string
          featured: boolean
          id: number
          order_position: number
          short_description: string
          slug: string
          status: Database["public"]["Enums"]["service_status"]
          technologies: string[] | null
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          benefits?: string[] | null
          category_id: number
          complexity?: Database["public"]["Enums"]["service_complexity"]
          content: string
          cover_image?: string | null
          created_at?: string
          featured?: boolean
          id?: number
          order_position?: number
          short_description: string
          slug: string
          status?: Database["public"]["Enums"]["service_status"]
          technologies?: string[] | null
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          benefits?: string[] | null
          category_id?: number
          complexity?: Database["public"]["Enums"]["service_complexity"]
          content?: string
          cover_image?: string | null
          created_at?: string
          featured?: boolean
          id?: number
          order_position?: number
          short_description?: string
          slug?: string
          status?: Database["public"]["Enums"]["service_status"]
          technologies?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      site_sections: {
        Row: {
          content: string
          created_at: string
          enabled: boolean
          id: number
          image: string | null
          section_key: string
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          enabled?: boolean
          id?: number
          image?: string | null
          section_key: string
          subtitle: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          enabled?: boolean
          id?: number
          image?: string | null
          section_key?: string
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      promote_user_by_id: {
        Args: { user_id: string }
        Returns: boolean
      }
      promote_user_to_admin: {
        Args: { user_email: string }
        Returns: boolean
      }
    }
    Enums: {
      plan_status: "draft" | "published"
      service_complexity: "basic" | "intermediate" | "advanced"
      service_status: "draft" | "published"
      service_type:
        | "cloud"
        | "server"
        | "database"
        | "wifi"
        | "hard-drive"
        | "archive"
        | "signal"
      user_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      plan_status: ["draft", "published"],
      service_complexity: ["basic", "intermediate", "advanced"],
      service_status: ["draft", "published"],
      service_type: [
        "cloud",
        "server",
        "database",
        "wifi",
        "hard-drive",
        "archive",
        "signal",
      ],
      user_role: ["admin", "editor", "viewer"],
    },
  },
} as const
